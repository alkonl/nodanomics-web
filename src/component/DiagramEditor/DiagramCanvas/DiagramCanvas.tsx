import React, {DragEvent, useCallback, useRef, useState} from 'react';
import ReactFlow, {
    Background,
    Controls,
    // eslint-disable-next-line import/named
    ReactFlowInstance, NodeChange, EdgeChange, ConnectionMode,
} from 'reactflow';

import 'reactflow/dist/style.css';
import {useOnDrop} from "../../../hooks";
import styles from './DiagramCanvas.module.scss'
import {EConnection, EDiagramNode} from "../../../interface";
import {FormulaNode, PoolNode, SourceNode, VariableNode} from "../CutomNode";
import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../../../redux";
import {Box} from "@mui/material";
import {DataConnection} from "../CustomConnectionLine/DataConnection";
import {LogicConnection} from "../CustomConnectionLine/LogicConnection";
import {useOnConnect} from "../../../hooks/useOnConnect";


const nodeTypes = {
    [EDiagramNode.Variable]: VariableNode,
    [EDiagramNode.Formula]: FormulaNode,
    [EDiagramNode.Source]: SourceNode,
    [EDiagramNode.Pool]: PoolNode,
};

const edgeTypes = {
    [EConnection.DataConnection]: DataConnection,
    [EConnection.LogicConnection]: LogicConnection,
}


export const DiagramCanvas = () => {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch()

    const {diagramNodes, diagramEdges} = useDiagramEditorState()
    const {onNodesChange, addEdge} = diagramEditorActions
    const onNodesChangeHandler = useCallback((nodes: NodeChange[]) => dispatch(onNodesChange(nodes)), [dispatch])
    const onEgeChangeHandler = useCallback((eges: EdgeChange[]) => dispatch(addEdge(eges)), [dispatch])
    const onConnectHandler = useOnConnect()

    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>();


    const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useOnDrop({
        flowInstance: reactFlowInstance,
        flowWrapper: reactFlowWrapper.current !== null ? reactFlowWrapper.current : undefined,
    })


    return (
        <Box
            className={styles.canvasContainer}
        >
            <Box
                sx={{
                    flex: 1,
                }}
                ref={reactFlowWrapper}
            >
                <ReactFlow
                    nodes={diagramNodes}
                    edges={diagramEdges}
                    onNodesChange={onNodesChangeHandler}
                    onEdgesChange={onEgeChangeHandler}
                    onConnect={onConnectHandler}
                    nodeTypes={nodeTypes}
                    fitView
                    onInit={setReactFlowInstance}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    edgeTypes={edgeTypes}
                    connectionMode={ConnectionMode.Loose}
                >
                    <Controls/>
                    <Background color="blue" gap={16}/>
                </ReactFlow>
            </Box>
        </Box>

    );
};

