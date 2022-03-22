import {jsx as $2BvW4$jsx, jsxs as $2BvW4$jsxs} from "react/jsx-runtime";
import {useState as $2BvW4$useState, useEffect as $2BvW4$useEffect} from "react";
import $2BvW4$classnames from "classnames";


console.log(1)

const $e7d69bb808fab13a$var$isDebugging = false;
const $e7d69bb808fab13a$export$bef1f36f5486a6a3 = (...args)=>{
    if (!$e7d69bb808fab13a$var$isDebugging) return;
    console.log(...args);
};




function $2aa841a42821d95d$var$HasChildrenIcon({ style: style = {
} , className: className = ""  }) {
    return(/*#__PURE__*/ $2BvW4$jsx("svg", {
        style: {
            width: "14px",
            height: "14px",
            ...style
        },
        className: className,
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024",
        children: /*#__PURE__*/ $2BvW4$jsx("path", {
            d: "M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"
        })
    }));
}
var $2aa841a42821d95d$export$2e2bcd8739ae039 = $2aa841a42821d95d$var$HasChildrenIcon;


var $aba4d52062eba623$export$4767d4262788a6cc;
var $aba4d52062eba623$export$18c2a824b67013db;
var $aba4d52062eba623$export$a7db06668cad9adb;
var $aba4d52062eba623$export$8987e38cfd004b13;
var $aba4d52062eba623$export$4abf93826ca6be80;
var $aba4d52062eba623$export$52105d146316f63c;
var $aba4d52062eba623$export$3d42352dbb9c2ab7;
var $aba4d52062eba623$export$5f8a311b4d5b03df;
var $aba4d52062eba623$export$d90250155de6d7e7;
var $aba4d52062eba623$export$3425b4b8a6a02aa5;
$aba4d52062eba623$export$4767d4262788a6cc = "tree_3f243b";
$aba4d52062eba623$export$18c2a824b67013db = "tree-node_3f243b";
$aba4d52062eba623$export$a7db06668cad9adb = "content_3f243b";
$aba4d52062eba623$export$8987e38cfd004b13 = "switcher_3f243b";
$aba4d52062eba623$export$4abf93826ca6be80 = "switcher-icon_3f243b";
$aba4d52062eba623$export$52105d146316f63c = "expanded_3f243b";
$aba4d52062eba623$export$3d42352dbb9c2ab7 = "switcher-placeholder_3f243b";
$aba4d52062eba623$export$5f8a311b4d5b03df = "title-wrapper_3f243b";
$aba4d52062eba623$export$d90250155de6d7e7 = "selected_3f243b";
$aba4d52062eba623$export$3425b4b8a6a02aa5 = "children-wrapper_3f243b";


function $b814d7fb197b76cb$var$deleteKeyFromArray(key, array) {
    return array.filter((keyFromArray)=>keyFromArray !== key
    );
}
function $b814d7fb197b76cb$var$Tree({ data: data = [] , selectedKeys: selectedKeysFromProps , expandedKeys: expandedKeysFromProps , defaultExpandedKeys: defaultExpandedKeys = [] , defaultSelectedKeys: defaultSelectedKeys = [] , onSelect: onSelect , onExpand: onExpand  }) {
    const [selectedKeys, setSelectedKeys] = $2BvW4$useState(selectedKeysFromProps || defaultSelectedKeys);
    const [expandedKeys, setExpandedKeys] = $2BvW4$useState(expandedKeysFromProps || defaultExpandedKeys);
    $2BvW4$useEffect(()=>{
        // 处理 selectedKeysFromProps 的 变化
        // 也要防止第一次变为 undefined
        selectedKeysFromProps && setSelectedKeys(selectedKeysFromProps);
        $e7d69bb808fab13a$export$bef1f36f5486a6a3("selectedKeysFromProps useEffect", {
            expandedKeysFromProps: expandedKeysFromProps,
            selectedKeys: selectedKeys
        });
    }, [
        selectedKeysFromProps
    ]);
    $2BvW4$useEffect(()=>{
        // 处理 expandedKeysFromProps 的 变化
        // 也要防止第一次变为 undefined
        expandedKeysFromProps && setExpandedKeys(expandedKeysFromProps);
        $e7d69bb808fab13a$export$bef1f36f5486a6a3("expandedKeysFromProps useEffect", {
            expandedKeysFromProps: expandedKeysFromProps,
            expandedKeys: expandedKeys
        });
    }, [
        expandedKeysFromProps
    ]);
    const onTreeSelect = (key, { selected: selected , node: node  })=>{
        const keys = selected ? selectedKeys.concat(key) : $b814d7fb197b76cb$var$deleteKeyFromArray(key, selectedKeys);
        onSelect?.(keys, {
            node: node
        });
        $e7d69bb808fab13a$export$bef1f36f5486a6a3("onTreeSelect", keys);
        // 如果外界没有传入 selectedKeysFromProps 状态需要自己维护
        if (!selectedKeysFromProps) setSelectedKeys(keys);
    };
    const onTreeExpand = (key, { expanded: expanded , node: node  })=>{
        const keys = expanded ? expandedKeys.concat(key) : $b814d7fb197b76cb$var$deleteKeyFromArray(key, expandedKeys);
        onExpand?.(keys, {
            node: node
        });
        $e7d69bb808fab13a$export$bef1f36f5486a6a3("onTreeExpand", keys);
        // 如果外界没有传入 expandedKeysFromProps 状态需要自己维护
        if (!expandedKeysFromProps) setExpandedKeys(keys);
    };
    $e7d69bb808fab13a$export$bef1f36f5486a6a3("Tree render", {
        selectedKeys: selectedKeys,
        expandedKeys: expandedKeys
    });
    return(/*#__PURE__*/ $2BvW4$jsx("div", {
        className: $aba4d52062eba623$export$4767d4262788a6cc,
        children: data.map((nodeData)=>/*#__PURE__*/ $2BvW4$jsx($b814d7fb197b76cb$var$TreeNode, {
                data: nodeData,
                selectedKeys: selectedKeys,
                expandedKeys: expandedKeys,
                onSelect: onTreeSelect,
                onExpand: onTreeExpand
            }, nodeData.key)
        )
    }));
}
function $b814d7fb197b76cb$var$TreeNode({ data: data , selectedKeys: selectedKeys , expandedKeys: expandedKeys , onSelect: onSelect , onExpand: onExpand  }) {
    const hasChildren = data.children?.length ? true : false;
    const selected = selectedKeys?.includes(data.key);
    const expanded = expandedKeys?.includes(data.key);
    const onNodeSelect = ()=>{
        $e7d69bb808fab13a$export$bef1f36f5486a6a3("onNodeSelect", {
            selected: !expanded,
            data: data,
            key: data.key
        });
        onSelect(data.key, {
            selected: !selected,
            node: data
        });
    };
    const onNodeExpand = ()=>{
        $e7d69bb808fab13a$export$bef1f36f5486a6a3("onNodeExpand", {
            expanded: !expanded,
            data: data,
            key: data.key
        });
        onExpand(data.key, {
            expanded: !expanded,
            node: data
        });
    };
    return(/*#__PURE__*/ $2BvW4$jsxs("div", {
        className: $aba4d52062eba623$export$18c2a824b67013db,
        children: [
            /*#__PURE__*/ $2BvW4$jsxs("div", {
                className: $aba4d52062eba623$export$a7db06668cad9adb,
                children: [
                    hasChildren ? /*#__PURE__*/ $2BvW4$jsx("div", {
                        onClick: onNodeExpand,
                        className: $aba4d52062eba623$export$8987e38cfd004b13,
                        children: /*#__PURE__*/ $2BvW4$jsx($2aa841a42821d95d$export$2e2bcd8739ae039, {
                            className: $2BvW4$classnames($aba4d52062eba623$export$4abf93826ca6be80, {
                                [$aba4d52062eba623$export$52105d146316f63c]: expanded
                            })
                        })
                    }) : /*#__PURE__*/ $2BvW4$jsx("div", {
                        className: $aba4d52062eba623$export$3d42352dbb9c2ab7
                    }),
                    /*#__PURE__*/ $2BvW4$jsx("div", {
                        className: $2BvW4$classnames($aba4d52062eba623$export$5f8a311b4d5b03df, {
                            [$aba4d52062eba623$export$d90250155de6d7e7]: selected
                        }),
                        onClick: onNodeSelect,
                        children: /*#__PURE__*/ $2BvW4$jsx("span", {
                            children: data.title
                        })
                    })
                ]
            }),
            /*#__PURE__*/ $2BvW4$jsx("div", {
                className: $2BvW4$classnames($aba4d52062eba623$export$3425b4b8a6a02aa5, {
                    [$aba4d52062eba623$export$52105d146316f63c]: expanded
                }),
                children: data.children.map((nodeData)=>/*#__PURE__*/ $2BvW4$jsx($b814d7fb197b76cb$var$TreeNode, {
                        data: nodeData,
                        selectedKeys: selectedKeys,
                        expandedKeys: expandedKeys,
                        onSelect: onSelect,
                        onExpand: onExpand
                    }, nodeData.key)
                )
            })
        ]
    }));
}
var $b814d7fb197b76cb$export$2e2bcd8739ae039 = $b814d7fb197b76cb$var$Tree;


export {$b814d7fb197b76cb$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=module.js.map
