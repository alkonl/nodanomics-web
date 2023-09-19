import React from 'react';
import {useDiagramEditorState} from "../../../../../../redux";
import {IReactFlowNode} from "../../../../../../interface";
import {NestedListContainer} from "./NestedListContainer";
import {useReactFlowInstance} from "../../../../../../hooks";

export const NodeHierarchy = () => {
    const {diagramNodes} = useDiagramEditorState()
    const {reactFlowInstance} = useReactFlowInstance().data;

    const focusNode = (node: IReactFlowNode) => {
        const nodeSize = {
            width: node.width || 250,
            height: node.height || 100,
        }
        const nodePosition = {
            x:  node.positionAbsolute?.x || node.position.x,
            y: node.positionAbsolute?.y || node.position.y,
        }
        const x = nodePosition.x + nodeSize.width / 2;
        const y = nodePosition.y + nodeSize.height / 2;
        const zoom = 1.85;
        reactFlowInstance?.setCenter(x, y, {zoom, duration: 600});
    };

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
