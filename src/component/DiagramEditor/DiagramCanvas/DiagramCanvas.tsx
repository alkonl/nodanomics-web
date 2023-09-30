import React, {DragEvent, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import type {EdgeChange, NodeChange, ReactFlowInstance} from 'reactflow'
// eslint-disable-next-line import/named
import ReactFlow, {Background, BackgroundVariant, ConnectionMode, Controls} from 'reactflow';
import 'reactflow/dist/style.css';

import {
    useAddStartNode,
    useDiagramKeyboardManager,
    useEdgeUpdateManager,
    useOnDrop,
    useOnEdgeClick,
    useOnNodeDrag,
    useOnNodeDragStart,
    useOnNodeDragStop,
    useOnSelectionChange,
    useReactFlowInstance,
    useUploadDiagramOnServer
} from "../../../hooks";
import styles from './DiagramCanvas.module.scss'
import {EConnection, EDiagramNode} from "../../../interface";
import {
    DataNode,
    EventListenerNode,
    EventTriggerNode,
    FormulaNode,
    LabelNode,
    MicroLoopNode,
    OriginNode,
    SinkNode,
    StartNode,
    StaticVariableNode,
    TransferNode,
    WhileLoopNode
} from "../CutomNode";
import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../../../redux";
import {Box} from "@mui/material";
import {DataConnection} from "../CustomConnectionLine/DataConnection";
import {LogicConnection} from "../CustomConnectionLine/LogicConnection";
import {useOnConnect} from "../../../hooks/useOnConnect";
import {ChainConnection} from "../CustomConnectionLine/ChainConnection";
import {DatasetNode} from "../CutomNode/DatasetNode";
import {EColor, multiSelectKeyCodes} from "../../../constant";
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
    [EDiagramNode.Label]: LabelNode,
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
    const [isInteractive, setIsInteractive] = useState<boolean>(true)
    const onInteractiveChange = (isInteractive: boolean) => {
        setIsInteractive(isInteractive)
    }

    // the library has a bug. When interactivity is blocked,
    // edges can still be manipulated.
    // To remove the ability to change edges,
    // it is necessary not to pass the onEdgeUpdate function
    const onEdgeUpdateHandlerWithInteractive: typeof onEdgeUpdateHandler | undefined = useMemo(() => {
        if (isInteractive) {
            return onEdgeUpdateHandler
        }
        return undefined
    }, [isInteractive])

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
                    onEdgeUpdate={onEdgeUpdateHandlerWithInteractive}
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
                    <Controls onInteractiveChange={onInteractiveChange}/>
                    <Background id="1" gap={38} color={EColor.darkMarineLight} variant={BackgroundVariant.Lines}/>
                    <Background id="2" gap={220} offset={1} color={EColor.darkMarineLight}
                                variant={BackgroundVariant.Lines}/>
                </ReactFlow>
            </Box>
        </Box>

    );
};

