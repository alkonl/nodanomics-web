import React from 'react';
import {IReactFlowNode, isILoopNodeData} from "../../../../../../interface";
import {NodeNestedItem} from "./NodeNestedItem";

export const NodeNestedListRecursive: React.FC<{
    nodes: IReactFlowNode[]
    childrenNodes: IReactFlowNode[]
    onNodeClick?: (node: IReactFlowNode) => void
}> = ({onNodeClick, nodes, childrenNodes}) => {

    const toRender = childrenNodes || nodes
    return (
        <ul>
            {toRender.map((node) => {
                let children: IReactFlowNode[] | undefined = undefined
                const data = node.data
                if (isILoopNodeData(data)) {
                    console.log('data.children', data.children)
                    children = nodes.filter((potentialChild) => {
                        return potentialChild.parentNode === node.id
                    })
                }
                return (<li key={node.id}>
                    <NodeNestedItem node={node} onNodeClick={onNodeClick}/>
                    {children &&
                        <NodeNestedListRecursive onNodeClick={onNodeClick} nodes={nodes} childrenNodes={children}/>}
                </li>)
            })}
        </ul>
    );
};
