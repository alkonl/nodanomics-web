import React, {DragEvent, useCallback, useRef, useState} from 'react';
// eslint-disable-next-line import/named
import ReactFlow, {Background, ConnectionMode, Controls, EdgeChange, NodeChange, ReactFlowInstance} from 'reactflow';
import 'reactflow/dist/style.css';

import {
    useAddStartNode,
    useEdgeUpdateManager,
    useOnDrop, useOnNodeDrag,
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
    MicroLoopNode,
    OriginNode,
    StaticVariableNode,
    DataNode, WhileLoopNode, StartNode
} from "../CutomNode";
import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../../../redux";
import {Box} from "@mui/material";
import {DataConnection} from "../CustomConnectionLine/DataConnection";
import {LogicConnection} from "../CustomConnectionLine/LogicConnection";
import {useOnConnect} from "../../../hooks/useOnConnect";
import {ChainConnection} from "../CustomConnectionLine/ChainConnection";
import {DatasetNode} from "../CutomNode/DatasetNode";
import {GAP_BETWEEN_EDITOR_CANVAS_DOTS} from "../../../constant";


const nodeTypes = {
    [EDiagramNode.StaticVariable]: StaticVariableNode,
    [EDiagramNode.Formula]: FormulaNode,
    [EDiagramNode.Origin]: OriginNode,
    [EDiagramNode.Data]: DataNode,
    [EDiagramNode.EventTrigger]: EventTriggerNode,
    [EDiagramNode.EventListener]: EventListenerNode,
    [EDiagramNode.MicroLoop]: MicroLoopNode,
    [EDiagramNode.WhileLoop]: WhileLoopNode,
    [EDiagramNode.DatasetDatafield]: DatasetNode,
    [EDiagramNode.Start]: StartNode,
};

const edgeTypes = {
    [EConnection.DataConnection]: DataConnection,
    [EConnection.LogicConnection]: LogicConnection,
    [EConnection.ChainConnection]: ChainConnection,
}


export const DiagramCanvas = () => {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch()

    const {diagramNodes, diagramEdges} = useDiagramEditorState()

    const onNodeDragStop = useOnNodeDragStop()
    const onNodeDrag = useOnNodeDrag()

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

    // add Start node
    useAddStartNode()


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
                    onNodeDrag={onNodeDrag}
                    onDragOver={onDragOver}
                    onNodeDragStart={onNodeDragStart}
                    onNodeDragStop={onNodeDragStop}
                    edgeTypes={edgeTypes}
                    connectionMode={ConnectionMode.Loose}
                >
                    <Controls/>
                    <Background color="blue" gap={GAP_BETWEEN_EDITOR_CANVAS_DOTS}/>
                </ReactFlow>
            </Box>
        </Box>

    );
};

