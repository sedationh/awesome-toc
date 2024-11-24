import { describe, it, afterAll, expect } from "vitest";
import {
  buildNestedTokenDOMs,
  NestedTokenDOM,
  nestTokenDOMs,
} from "./preprocess";
import { Window } from "happy-dom";
import logger from "../utils/logger";

type TestDataNode = {
  key: string;
  tagName: string;
  children: TestDataNode[];
};

export const buildTestData = (nestedTokenDOMs: NestedTokenDOM[]) => {
  const treeData = [] as TestDataNode[];
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
  const treeDataItem: TestDataNode = {
    key: nestedTokenDOM.key,
    tagName: nestedTokenDOM.dom.tagName,
    children: [],
  };

  for (const child of nestedTokenDOM.children) {
    const childTreeDataItem = buildTreeDataItem(child);
    treeDataItem.children?.push(childTreeDataItem);
  }

  return treeDataItem;
};

const window = new Window();
const document = window.document;

afterAll(() => {
  window.close();
});

describe("nestTokenDOMs", () => {
  it("正常情况: [] + h1", () => {
    const nestedTokenDOMs: NestedTokenDOM[] = buildNestedTokenDOMs(
      [].map((v) => document.createElement(v))
    );
    const currentNestedTokenDOM = new NestedTokenDOM(
      document.createElement("h1") as unknown as HTMLElement
    );
    nestTokenDOMs(nestedTokenDOMs, currentNestedTokenDOM);
    expect(buildTestData(nestedTokenDOMs)).toEqual([
      {
        key: "0",
        tagName: "H1",
        children: [],
      },
    ]);
  });

  it("正常情况: [h1] + h2", () => {
    const nestedTokenDOMs: NestedTokenDOM[] = buildNestedTokenDOMs(
      ["h1"].map((v) => document.createElement(v) as unknown as HTMLElement)
    );
    const currentNestedTokenDOM = new NestedTokenDOM(
      document.createElement("h2") as unknown as HTMLElement
    );
    nestTokenDOMs(nestedTokenDOMs, currentNestedTokenDOM);
    expect(buildTestData(nestedTokenDOMs)).toEqual([
      {
        key: "0",
        tagName: "H1",
        children: [
          {
            key: "0-0",
            tagName: "H2",
            children: [],
          },
        ],
      },
    ]);
  });

  it("正常情况: [h1, h2] + h3", () => {
    const nestedTokenDOMs: NestedTokenDOM[] = buildNestedTokenDOMs(
      ["h1", "h2"].map(
        (v) => document.createElement(v) as unknown as HTMLElement
      )
    );
    const currentNestedTokenDOM = new NestedTokenDOM(
      document.createElement("h3") as unknown as HTMLElement
    );
    nestTokenDOMs(nestedTokenDOMs, currentNestedTokenDOM);
    expect(buildTestData(nestedTokenDOMs)).toEqual([
      {
        key: "0",
        tagName: "H1",
        children: [
          {
            key: "0-0",
            tagName: "H2",
            children: [
              {
                key: "0-0-0",
                tagName: "H3",
                children: [],
              },
            ],
          },
        ],
      },
    ]);
  });

  it("正常情况: [h1, h2] + h2", () => {
    const nestedTokenDOMs: NestedTokenDOM[] = buildNestedTokenDOMs(
      ["h1", "h2"].map(
        (v) => document.createElement(v) as unknown as HTMLElement
      )
    );
    const currentNestedTokenDOM = new NestedTokenDOM(
      document.createElement("h2") as unknown as HTMLElement
    );
    nestTokenDOMs(nestedTokenDOMs, currentNestedTokenDOM);
    expect(buildTestData(nestedTokenDOMs)).toEqual([
      {
        key: "0",
        tagName: "H1",
        children: [
          {
            key: "0-0",
            tagName: "H2",
            children: [],
          },
          {
            key: "0-1",
            tagName: "H2",
            children: [],
          },
        ],
      },
    ]);
  });

  it("正常情况: [h1, h2] + h1", () => {
    const nestedTokenDOMs: NestedTokenDOM[] = buildNestedTokenDOMs(
      ["h1", "h2"].map(
        (v) => document.createElement(v) as unknown as HTMLElement
      )
    );
    const currentNestedTokenDOM = new NestedTokenDOM(
      document.createElement("h1") as unknown as HTMLElement
    );
    nestTokenDOMs(nestedTokenDOMs, currentNestedTokenDOM);
    expect(buildTestData(nestedTokenDOMs)).toEqual([
      {
        key: "0",
        tagName: "H1",
        children: [
          {
            key: "0-0",
            tagName: "H2",
            children: [],
          },
        ],
      },
      {
        key: "1",
        tagName: "H1",
        children: [],
      },
    ]);
  });

  it("非正常情况: [h2] + h1", () => {
    const nestedTokenDOMs: NestedTokenDOM[] = buildNestedTokenDOMs(
      ["h2"].map((v) => document.createElement(v) as unknown as HTMLElement)
    );
    const currentNestedTokenDOM = new NestedTokenDOM(
      document.createElement("h1") as unknown as HTMLElement
    );
    nestTokenDOMs(nestedTokenDOMs, currentNestedTokenDOM);
    expect(buildTestData(nestedTokenDOMs)).toEqual([
      {
        key: "0",
        tagName: "H2",
        children: [],
      },
      {
        key: "1",
        tagName: "H1",
        children: [],
      },
    ]);
  });

  it("非正常情况: [h1] + h3", () => {
    const nestedTokenDOMs: NestedTokenDOM[] = buildNestedTokenDOMs(
      ["h1"].map((v) => document.createElement(v) as unknown as HTMLElement)
    );
    const currentNestedTokenDOM = new NestedTokenDOM(
      document.createElement("h3") as unknown as HTMLElement
    );
    nestTokenDOMs(nestedTokenDOMs, currentNestedTokenDOM);
    expect(buildTestData(nestedTokenDOMs)).toEqual([
      {
        key: "0",
        tagName: "H1",
        children: [
          {
            key: "0-0",
            tagName: "H3",
            children: [],
          },
        ],
      },
    ]);
  });

  it("非正常情况: [h1, h3] + h3", () => {
    const nestedTokenDOMs: NestedTokenDOM[] = buildNestedTokenDOMs(
      ["h1", "h3"].map(
        (v) => document.createElement(v) as unknown as HTMLElement
      )
    );
    const currentNestedTokenDOM = new NestedTokenDOM(
      document.createElement("h3") as unknown as HTMLElement
    );
    nestTokenDOMs(nestedTokenDOMs, currentNestedTokenDOM);
    expect(buildTestData(nestedTokenDOMs)).toEqual([
      {
        key: "0",
        tagName: "H1",
        children: [
          {
            key: "0-0",
            tagName: "H3",
            children: [],
          },
          {
            key: "0-1",
            tagName: "H3",
            children: [],
          },
        ],
      },
    ]);
  });
});
