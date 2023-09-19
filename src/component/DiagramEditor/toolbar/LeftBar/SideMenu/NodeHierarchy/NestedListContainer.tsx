import React from 'react';
import {IReactFlowNode} from "../../../../../../interface";
import {NodeNestedListRecursive} from "./NodeNestedListRecursive";
import styles from './NestedListContainer.module.scss'

export const NestedListContainer: React.FC<{
    nodes: IReactFlowNode[]
    childrenNodes: IReactFlowNode[]
    onNodeClick?: (node: IReactFlowNode) => void
}> = ({onNodeClick, nodes, childrenNodes}) => {
    return (
        <div className={styles.nestedListContainer}>
            <NodeNestedListRecursive nodes={nodes} childrenNodes={childrenNodes} onNodeClick={onNodeClick}/>
        </div>
    );
};
