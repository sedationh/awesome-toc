import React from "react";
import Tree from "@sedationh/react-tree";
import "@sedationh/react-tree/assets/style.css";
import { Button, type TreeDataNode, type TreeProps } from "antd";

const treeData: TreeDataNode[] = [
  {
    title: "parent 1",
    key: "0-0",
    children: [
      {
        title: "parent 1-0",
        key: "0-0-0",
        disabled: true,
        children: [
          {
            title: "leaf",
            key: "0-0-0-0",
            disableCheckbox: true,
          },
          {
            title: "leaf",
            key: "0-0-0-1",
          },
        ],
      },
      {
        title: "parent 1-1",
        key: "0-0-1",
        children: [
          {
            title: <span style={{ color: "#1677ff" }}>sss</span>,
            key: "0-0-1-0",
          },
        ],
      },
    ],
  },
];

const App: React.FC = () => {
  const onSelect: TreeProps["onSelect"] = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };

  const onCheck: TreeProps["onCheck"] = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info);
  };

  return (
    <div className="app">
      <Tree
        data={treeData as any}
        defaultExpandedKeys={["0-0-0", "0-0-1"]}
        defaultSelectedKeys={["0-0-0", "0-0-1"]}
      />
      <Button>1</Button>
    </div>
  );
};

export default App;
