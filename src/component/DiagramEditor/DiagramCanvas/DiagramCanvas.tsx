import React, {DragEvent, useCallback, useMemo, useRef, useState} from 'react';
import ReactFlow, {
    addEdge,
    Background,
    // eslint-disable-next-line import/named
    Connection, Edge, ReactFlowInstance, Node, NodeChange,

    Controls,
    useEdgesState,
} from 'reactflow';

import 'reactflow/dist/style.css';
import {useOnDrop, useWidthAndHeight} from "../../../hooks";
import styles from './DiagramCanvas.module.scss'
import {EDiagramNode} from "../../../interface";
import {FormulaNode, VariableNode} from "../CutomNode";
import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../../../redux";
import {Box} from "@mui/material";


const initialEdges: Edge[] = [];

export const DiagramCanvas = () => {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch()

    // const [nodes, setNodes, onNodesChange] = useNodesState<INodeData[]>([]);
    const nodes = useDiagramEditorState().diagramNodes
    const {onNodesChange} = diagramEditorActions
    const onNodesChangeHandler = useCallback((nodes: NodeChange[]) => dispatch(onNodesChange(nodes)), [])


    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(initialEdges);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>();
    const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), []);

    const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useOnDrop({
        flowInstance: reactFlowInstance,
        flowWrapper: reactFlowWrapper.current !== null ? reactFlowWrapper.current : undefined,
    })


    const {elementSize: canvasContainerSize, elementRef: canvasContainerRef} = useWidthAndHeight()
    const nodeTypes: {
        [key in EDiagramNode]?: React.FC<any>
    } = useMemo(() => {
        return {
            [EDiagramNode.Variable]: VariableNode,
            [EDiagramNode.Formula]: FormulaNode,
            // [EDiagramNode.Drain]: VariableNode,
            // [EDiagramNode.Pool]: VariableNode,
        }
    }, []);
    return (
        <Box
            className={styles.canvasContainer}
            ref={canvasContainerRef}
        >
            <Box
                sx={{
                    flex: 1,
                }}
                ref={reactFlowWrapper}
            >
                <ReactFlow
                    nodeTypes={nodeTypes}
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChangeHandler}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitView
                    attributionPosition="top-right"
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

