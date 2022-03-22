export type TreeData = NodeData[];
interface TreeProps {
    data: TreeData;
    selectedKeys?: string[];
    expandedKeys?: string[];
    defaultExpandedKeys?: string[];
    defaultSelectedKeys?: string[];
    onSelect?: (keys: string[], { node: NodeData }: {
        node: any;
    }) => void;
    onExpand?: (keys: string[], { node: NodeData }: {
        node: any;
    }) => void;
}
export default function Tree({ data, selectedKeys: selectedKeysFromProps, expandedKeys: expandedKeysFromProps, defaultExpandedKeys, defaultSelectedKeys, onSelect, onExpand, }: TreeProps): JSX.Element;
export interface NodeData {
    key: string;
    title: string;
    children?: NodeData[];
}
export default Tree;

//# sourceMappingURL=types.d.ts.map
