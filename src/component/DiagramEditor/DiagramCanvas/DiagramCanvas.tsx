import React, {DragEvent, useCallback, useRef, useState} from 'react';
// eslint-disable-next-line import/named
import ReactFlow, {Background, ConnectionMode, Controls, EdgeChange, NodeChange, ReactFlowInstance} from 'reactflow';
import 'reactflow/dist/style.css';

import {
    useEdgeUpdateManager,
    useOnDrop,
    useOnNodeDragStart,
    useOnNodeDragStop,
    useUploadDiagramOnServer
} from "../../../hooks";
import styles from './DiagramCanvas.module.scss'
import {EConnection, EDiagramNode} from "../../../interface";
import {
    EventListenerNode,
    EventTriggerNode,
    FormulaNode,
    MicroLoop,
    SourceNode,
    StaticVariableNode,
    VariableNode
} from "../CutomNode";
import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../../../redux";
import {Box} from "@mui/material";
import {DataConnection} from "../CustomConnectionLine/DataConnection";
import {LogicConnection} from "../CustomConnectionLine/LogicConnection";
import {useOnConnect} from "../../../hooks/useOnConnect";
import {EventConnection} from "../CustomConnectionLine/EventConnection";


const nodeTypes = {
    [EDiagramNode.StaticVariable]: StaticVariableNode,
    [EDiagramNode.Formula]: FormulaNode,
    [EDiagramNode.Source]: SourceNode,
    [EDiagramNode.Variable]: VariableNode,
    [EDiagramNode.EventTrigger]: EventTriggerNode,
    [EDiagramNode.EventListener]: EventListenerNode,
    [EDiagramNode.MicroLoop]: MicroLoop,
};

const edgeTypes = {
    [EConnection.DataConnection]: DataConnection,
    [EConnection.LogicConnection]: LogicConnection,
    [EConnection.EventConnection]: EventConnection,
}


export const DiagramCanvas = () => {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch()

    const {diagramNodes, diagramEdges} = useDiagramEditorState()

    const onNodeDragStop = useOnNodeDragStop()

    const {onNodesChange, addEdge} = diagramEditorActions
    const onNodesChangeHandler = useCallback((nodes: NodeChange[]) => dispatch(onNodesChange(nodes)), [dispatch])
    const onEgeChangeHandler = useCallback((eges: EdgeChange[]) => dispatch(addEdge(eges)), [dispatch])
    const onConnectHandler = useOnConnect()

    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>();


    const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onNodeDragStart = useOnNodeDragStart()

    const onDrop = useOnDrop({
        flowInstance: reactFlowInstance,
        flowWrapper: reactFlowWrapper.current !== null ? reactFlowWrapper.current : undefined,
    })

    useUploadDiagramOnServer()

    const {
        onEdgeUpdateStartHandler,
        onEdgeUpdateHandler,
        onEdgeUpdateEndHandler
    } = useEdgeUpdateManager()


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
                    onEdgeUpdateStart={onEdgeUpdateStartHandler}
                    onEdgeUpdate={onEdgeUpdateHandler}
                    onEdgeUpdateEnd={onEdgeUpdateEndHandler}
                    onConnect={onConnectHandler}
                    nodeTypes={nodeTypes}
                    fitView
                    onInit={setReactFlowInstance}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onNodeDragStart={onNodeDragStart}
                    onNodeDragStop={onNodeDragStop}
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

