import React, {DragEvent, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import ReactFlow, {
    addEdge,
    Background,
    // eslint-disable-next-line import/named
    Connection, Edge, ReactFlowInstance, Node, NodeChange,

    Controls,
    // eslint-disable-next-line import/named
    useEdgesState, applyNodeChanges, applyEdgeChanges, Handle, Position, EdgeChange,
} from 'reactflow';

import 'reactflow/dist/style.css';
import {useOnDrop, useWidthAndHeight} from "../../../hooks";
import styles from './DiagramCanvas.module.scss'
import {EDiagramNode} from "../../../interface";
import {FormulaNode, VariableNode} from "../CutomNode";
import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../../../redux";
import {Box} from "@mui/material";


const nodeTypes = {
    [EDiagramNode.Variable]: VariableNode,
    [EDiagramNode.Formula]: FormulaNode,
};

export const DiagramCanvas = () => {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch()

    const {diagramNodes, diagramEdges} = useDiagramEditorState()
    const {onNodesChange, onConnect, addEdge} = diagramEditorActions
    const onNodesChangeHandler = useCallback((nodes: NodeChange[]) => dispatch(onNodesChange(nodes)), [dispatch])
    const onEgeChangeHandler = useCallback((eges: EdgeChange[]) => dispatch(addEdge(eges)), [dispatch])
    const onConnectHandler = useCallback((params: Edge | Connection) => dispatch(onConnect(params)), [dispatch])

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
                    // nodeTypes={nodeTypes}
                    // nodes={nodes}
                    // edges={edges}
                    // onNodesChange={onNodesChangeHandler}
                    // onEdgesChange={handler}
                    // onConnect={onConnect}
                    // fitView
                    // attributionPosition="top-right"
                    onInit={setReactFlowInstance}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                >
                    <Controls/>
                    <Background color="blue" gap={16}/>
                </ReactFlow>
            </Box>
        </Box>

    );
};

