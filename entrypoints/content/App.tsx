import "antd/dist/antd.css";
import React, { Key, useEffect, useState } from "react";
import { Tree, TreeDataNode, TreeProps } from "antd";
import { debounce } from "lodash-es";
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

const App = () => {
  const [treeData, setTreeData] = useState<TreeDataNode[]>([]);
  const [key2dom, setKey2DOM] = useState<Map<string, HTMLElement>>(new Map());
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<Key[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const debouncedSetSelectedKeys = debounce(setSelectedKeys, 100);
  const debouncedSetExpandedKeys = debounce(setExpandedKeys, 100);

  useEffect(() => {
    const article = extractArticle();
    const tokenDOMs = extractTokenDOMs(article);
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
  }, []);

  const backgroundColor = isCollapsed ? "#FF4F37" : "#73e860";

  const onSelect: TreeProps["onSelect"] = (keys: Key[], { node }) => {
    const dom = key2dom.get(node.key as string);

    dom?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setSelectedKeys(keys);
  };

  const onExpand: TreeProps["onExpand"] = (keys, { node }) => {
    setExpandedKeys(keys);
  };

  return (
    <div className="tree-wrapper">
      <div
        className="btn"
        style={{
          backgroundColor,
        }}
        onClick={() => {
          setIsCollapsed((v) => !v);
        }}
      />
      {!!treeData.length && !isCollapsed && (
        <Tree
          multiple
          expandedKeys={expandedKeys}
          selectedKeys={selectedKeys}
          onSelect={onSelect}
          onExpand={onExpand}
          treeData={treeData}
        />
      )}
    </div>
  );
};

export default App;
