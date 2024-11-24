import React, { Key, useEffect, useMemo, useState } from "react";
import { Button, Tree, TreeDataNode, TreeProps } from "antd";
import { debounce } from "lodash-es";
import Draggable from "react-draggable";
import {
  buildDom2KeyMap,
  buildKey2DOM,
  buildNestedTokenDOMs,
  buildTreeData,
  extractArticle,
  extractTokenDOMs,
  getKeyArray,
  iterateNestedTokenDOMs,
} from "./preprocess";
import { ExpandOutlined, CompressOutlined } from "@ant-design/icons";
import { isFixedExpandedAllStorage } from "@/utils/storage";
import { useCurrentUrl } from "./hooks";
import logger from "../utils/logger";

const App = () => {
  const [treeData, setTreeData] = useState<TreeDataNode[]>([]);
  const [key2dom, setKey2DOM] = useState<Map<string, HTMLElement>>(new Map());
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<Key[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isFixedExpandedAll, setIsFixedExpandedAll] = useState(false);
  const dragRef = React.useRef<boolean>(false);
  const currentUrl = useCurrentUrl();

  const debouncedSetSelectedKeys = debounce(setSelectedKeys, 100);
  const debouncedSetExpandedKeys = debounce(setExpandedKeys, 100);

  const allKeys = useMemo(() => {
    return Array.from(key2dom.keys());
  }, [key2dom]);

  useEffect(() => {
    isFixedExpandedAllStorage.getValue().then((v) => {
      setIsFixedExpandedAll(v);
    });
  }, []);

  useEffect(() => {
    const article = extractArticle();
    const tokenDOMs = extractTokenDOMs(article);
    logger("tokenDOMs", {
      tokenDOMs: tokenDOMs.map((v) => v.tagName),
    });
    const nestedTokenDOMs = buildNestedTokenDOMs(tokenDOMs);
    const treeData = buildTreeData(nestedTokenDOMs);
    const key2dom = buildKey2DOM(nestedTokenDOMs);
    const dom2keyMap = buildDom2KeyMap(nestedTokenDOMs);

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const key = dom2keyMap.get(entry.target as HTMLElement);
          if (!key) return;

          debouncedSetSelectedKeys(getKeyArray(key));
          debouncedSetExpandedKeys(getKeyArray(key));
        }),
      {
        rootMargin: "0px 0px -85% 0px",
      }
    );

    iterateNestedTokenDOMs(nestedTokenDOMs, (nestedTokenDOM) => {
      observer.observe(nestedTokenDOM.dom);
    });

    setTreeData(treeData);
    setKey2DOM(key2dom);

    return () => {
      observer.disconnect();
    };
  }, [currentUrl]);

  const backgroundColor = isCollapsed ? "#FF4F37" : "#73e860";

  const onSelect: TreeProps["onSelect"] = (keys: Key[], { node }) => {
    const dom = key2dom.get(node.key as string);

    dom?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setSelectedKeys(keys);
  };

  const onExpand: TreeProps["onExpand"] = (keys) => {
    setExpandedKeys(keys);
  };

  return (
    <Draggable
      onStart={() => {
        dragRef.current = false;
      }}
      onDrag={() => {
        // 防止轻微的点击造成了拖拽但是影响了展开
        setTimeout(() => {
          dragRef.current = true;
        }, 100);
      }}
      handle="#btn"
    >
      <div className="awesome-toc-root">
        <div className="btn-sticky">
          <Button
            size="small"
            className="btn-fixed-expand-all"
            type="primary"
            icon={
              isFixedExpandedAll ? <ExpandOutlined /> : <CompressOutlined />
            }
            onClick={() => {
              setIsFixedExpandedAll((v) => !v);
            }}
          />
          <div
            className="btn"
            id="btn"
            style={{
              backgroundColor,
            }}
            onClick={() => {
              console.log("click", dragRef.current, isCollapsed);
              if (dragRef.current) return;
              setIsCollapsed((v) => !v);
            }}
          />
        </div>
        <div className="tree-wrapper">
          {!!treeData.length && !isCollapsed && (
            <Tree
              multiple
              expandedKeys={isFixedExpandedAll ? allKeys : expandedKeys}
              selectedKeys={selectedKeys}
              onSelect={onSelect}
              onExpand={onExpand}
              treeData={treeData}
            />
          )}
        </div>
      </div>
    </Draggable>
  );
};

export default App;
