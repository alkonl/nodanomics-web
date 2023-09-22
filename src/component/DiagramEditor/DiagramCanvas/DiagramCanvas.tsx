import React, {DragEvent, useCallback, useEffect, useRef, useState} from 'react';
// eslint-disable-next-line import/named
import ReactFlow, {
    Background,
    BackgroundVariant,
    ConnectionMode,
    Controls,
    EdgeChange,
    NodeChange,
    ReactFlowInstance
} from 'reactflow';
import 'reactflow/dist/style.css';

import {
    useAddStartNode,
    useEdgeUpdateManager,
    useOnDrop,
    useOnEdgeClick,
    useOnNodeDrag,
    useOnNodeDragStart,
    useOnNodeDragStop,
    useOnSelectionChange, useDiagramKeyboardManager,
    useUploadDiagramOnServer, useReactFlowInstance
} from "../../../hooks";
import styles from './DiagramCanvas.module.scss'
import {EConnection, EDiagramNode} from "../../../interface";
import {
    DataNode,
    EventListenerNode,
    EventTriggerNode,
    FormulaNode,
    MicroLoopNode,
    OriginNode,
    SinkNode,
    StartNode,
    StaticVariableNode, TransferNode,
    WhileLoopNode
} from "../CutomNode";
import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../../../redux";
import {Box} from "@mui/material";
import {DataConnection} from "../CustomConnectionLine/DataConnection";
import {LogicConnection} from "../CustomConnectionLine/LogicConnection";
import {useOnConnect} from "../../../hooks/useOnConnect";
import {ChainConnection} from "../CustomConnectionLine/ChainConnection";
import {DatasetNode} from "../CutomNode/DatasetNode";
import {EColor, GAP_BETWEEN_EDITOR_CANVAS_DOTS, multiSelectKeyCodes} from "../../../constant";
import './reactflowOverwrite.scss'

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
    [EDiagramNode.Sink]: SinkNode,
    [EDiagramNode.Transfer]: TransferNode,
};

const edgeTypes = {
    [EConnection.DataConnection]: DataConnection,
    [EConnection.LogicConnection]: LogicConnection,
    [EConnection.ChainConnection]: ChainConnection,
}


export const DiagramCanvas = () => {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>();

    const {setReactFlowInstanceAndWrapper} = useReactFlowInstance().actions

    useEffect(() => {
        setReactFlowInstanceAndWrapper({
            reactFlowInstance,
            reactFlowWrapper
        })
    }, [reactFlowInstance]);

    const dispatch = useAppDispatch()

    const {diagramNodes, diagramEdges} = useDiagramEditorState()
    const onSelectionChange = useOnSelectionChange()
    const onNodeDragStop = useOnNodeDragStop()
    const onNodeDrag = useOnNodeDrag()

    const {onNodesChange, addEdge} = diagramEditorActions
    const onNodesChangeHandler = useCallback((nodes: NodeChange[]) => dispatch(onNodesChange(nodes)), [dispatch])
    const onEgeChangeHandler = useCallback((eges: EdgeChange[]) => dispatch(addEdge(eges)), [dispatch])
    const onConnectHandler = useOnConnect()




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

    const onEdgeClick = useOnEdgeClick()

    useDiagramKeyboardManager()

    return (
        <Box
            className={styles.canvasContainer}
        >
            <Box
                sx={{
                    flex: 1,
                    backgroundColor: EColor.darkMarine2
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
                    onEdgeClick={onEdgeClick}
                    onSelectionChange={onSelectionChange}
                    multiSelectionKeyCode={multiSelectKeyCodes}
                    // we have custom way to delete nodes
                    deleteKeyCode={'undefined'}
                >
                    <Controls/>
                    <Background id="1" gap={38} color={EColor.darkMarineLight} variant={BackgroundVariant.Lines} />
                    <Background id="2" gap={220} offset={1} color={EColor.darkMarineLight} variant={BackgroundVariant.Lines} />
                    {/*<Background color={EColor.darkMarine2} gap={GAP_BETWEEN_EDITOR_CANVAS_DOTS}/>*/}
                </ReactFlow>
            </Box>
        </Box>

    );
};

