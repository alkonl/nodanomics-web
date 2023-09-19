import React from 'react';
import {useDiagramEditorState} from "../../../../../../redux";
import {IReactFlowNode} from "../../../../../../interface";
import {NestedListContainer} from "./NestedListContainer";
import {useFocusNode} from "../../../../../../hooks";

export const NodeHierarchy = () => {
    const {diagramNodes} = useDiagramEditorState()

    const focusNode = useFocusNode()

    const onNodeClick = (node: IReactFlowNode) => {
        focusNode(node)
    }

    const nodesToRender = diagramNodes.filter((node) => {
        return node.parentNode === undefined
    })

    return (
        <div>
            <NestedListContainer childrenNodes={nodesToRender} nodes={diagramNodes} onNodeClick={onNodeClick}/>
        </div>
    );
};
