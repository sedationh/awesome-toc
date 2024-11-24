import { TreeDataNode } from "antd";
import { cloneDeep } from "lodash-es";
import logger from "@/entrypoints/utils/logger";

export const extractArticle = () => {
  // TODO: 利用权重分析文章的 article element
  return (
    document.querySelector("article") ||
    document.querySelector("main") ||
    document.querySelector(".content") ||
    document.querySelector("body")
  );
};

export const extractTokenDOMs = (
  articleDOM: HTMLElement | null
): HTMLElement[] => {
  if (!articleDOM) return [];
  return Array.from(articleDOM.querySelectorAll("h1,h2,h3,h4,h5")).filter(
    (v) => !!v.textContent?.trim()
  ) as HTMLElement[];
};

export const buildNestedTokenDOMs = (
  tokenDOMs: HTMLElement[]
): NestedTokenDOM[] => {
  const nestedTokenDOMs = [] as NestedTokenDOM[];
  try {
    for (const tokenDOM of tokenDOMs) {
      const currentNestedTokenDOM = new NestedTokenDOM(tokenDOM);
      nestTokenDOMs(nestedTokenDOMs, currentNestedTokenDOM);
    }
  } catch (error) {
    console.log("buildNestedTokenDOMs 失败", error);
  }

  return nestedTokenDOMs;
};

export const buildTreeData = (nestedTokenDOMs: NestedTokenDOM[]) => {
  const treeData = [] as TreeDataNode[];
  try {
    for (const nestedTokenDOM of nestedTokenDOMs) {
      const treeDataItem = buildTreeDataItem(nestedTokenDOM);
      treeData.push(treeDataItem);
    }
  } catch (error) {
    console.log("buildTreeData 失败", error);
  }

  return treeData;
};

export const buildTreeDataItem = (nestedTokenDOM: NestedTokenDOM) => {
  const treeDataItem: TreeDataNode = {
    key: nestedTokenDOM.key,
    title: nestedTokenDOM.dom.innerText,
    children: [],
  };

  for (const child of nestedTokenDOM.children) {
    const childTreeDataItem = buildTreeDataItem(child);
    treeDataItem.children?.push(childTreeDataItem);
  }

  return treeDataItem;
};

export const buildKey2DOM = (nestedTokenDOMs: NestedTokenDOM[]) => {
  const key2dom = new Map<string, HTMLElement>();

  iterateNestedTokenDOMs(nestedTokenDOMs, (nestedTokenDOM) => {
    key2dom.set(nestedTokenDOM.key, nestedTokenDOM.dom);
  });

  return key2dom;
};

export const buildDom2KeyMap = (nestedTokenDOMs: NestedTokenDOM[]) => {
  const dom2keyMap = new Map<HTMLElement, string>();

  iterateNestedTokenDOMs(nestedTokenDOMs, (nestedTokenDOM) => {
    dom2keyMap.set(nestedTokenDOM.dom, nestedTokenDOM.key);
  });

  return dom2keyMap;
};

export function iterateNestedTokenDOMs(
  nestedTokenDOMs: NestedTokenDOM[],
  callback: (nestedTokenDOM: NestedTokenDOM) => void
) {
  const clonedNestedTokenDOMs = cloneDeep(nestedTokenDOMs);

  dfs(clonedNestedTokenDOMs);

  function dfs(nestedTokenDOMs: NestedTokenDOM[] | undefined) {
    if (!nestedTokenDOMs?.length) return;
    for (const nestedTokenDOM of nestedTokenDOMs) {
      callback(nestedTokenDOM);
      dfs(nestedTokenDOM.children);
    }
  }

  return clonedNestedTokenDOMs;
}

export function getKeyArray(key: string) {
  const arr = key.split("-");
  const len = arr.length;
  const keyArray = [];
  for (let end = 1; end <= len; end++) {
    keyArray.push(arr.slice(0, end).join("-"));
  }

  return keyArray;
}

export class NestedTokenDOM {
  dom: HTMLElement;
  children: NestedTokenDOM[];
  // 依赖于层级关系生成
  key = "";

  constructor(tokenDOM: HTMLElement, children: NestedTokenDOM[] = []) {
    this.dom = tokenDOM;
    this.children = children;
  }

  // 添加 toJSON 方法来控制序列化行为
  toJSON() {
    return {
      children: this.children,
      key: this.key,
    };
  }
}

function getLastItem<T>(array: T[]) {
  return array[array.length - 1];
}
function getLastItemIndex<T>(array: T[]) {
  return array.length - 1;
}

function getHeadingLevel(nestedTokenDOM: NestedTokenDOM) {
  return +nestedTokenDOM.dom.tagName.split("H").join("");
}

/**
 * 重点实现
 */
export function nestTokenDOMs(
  nestedTokenDOMs: NestedTokenDOM[],
  currentNestedTokenDOM: NestedTokenDOM
) {
  let children = nestedTokenDOMs;
  let lastItem = getLastItem(children);
  let lastItemIndex = getLastItemIndex(children);
  const lastItemLevel = lastItem ? getHeadingLevel(lastItem) : Infinity;
  const currentLevel = getHeadingLevel(currentNestedTokenDOM);
  let cnt = currentLevel - lastItemLevel;
  const keyArray = [];

  logger("currentLevel", {
    currentLevel,
    lastItemLevel,
    cnt,
    dom: currentNestedTokenDOM.dom.tagName,
  });

  // 最终定位到要进行添加的children
  while (cnt > 0) {
    lastItem = getLastItem(children);
    lastItemIndex = getLastItemIndex(children);
    logger("lastItem", {
      lastItem,
      lastItemDom: lastItem?.dom.tagName,
      lastItemIndex,
      children,
    });
    if (!lastItem || getHeadingLevel(lastItem) === currentLevel) {
      break;
    }
    keyArray.push(lastItemIndex);
    children = lastItem.children;
    cnt--;
  }

  logger("children", {
    children,
    currentNestedTokenDOM,
  });

  children.push(currentNestedTokenDOM);
  lastItemIndex = getLastItemIndex(children);
  keyArray.push(lastItemIndex);
  currentNestedTokenDOM.key = keyArray.join("-");
}
