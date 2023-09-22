import React from 'react';
import {Box} from "@mui/material";
import {IReactFlowNode} from "../../../../../../interface";
import {NodeNestedListRecursive} from "./NodeNestedListRecursive";
import styles from './NestedListContainer.module.scss'
import {EColor} from "../../../../../../constant";

export const NestedListContainer: React.FC<{
    nodes: IReactFlowNode[]
    childrenNodes: IReactFlowNode[]
    onNodeClick?: (node: IReactFlowNode) => void
}> = ({onNodeClick, nodes, childrenNodes}) => {
    return (
        <Box
            sx={{
                backgroundColor: EColor.darkMarineLight,
            }}
            className={styles.nestedListContainer}>
            <NodeNestedListRecursive nodes={nodes} childrenNodes={childrenNodes} onNodeClick={onNodeClick}/>
        </Box>
    );
};
