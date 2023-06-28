import React, {useCallback} from 'react';
import ReactFlow, {
    addEdge,
    Controls,
    Background,
    useNodesState,
    useEdgesState, Edge, Connection, Node
} from 'reactflow';

import 'reactflow/dist/style.css';
import {useWidthAndHeight} from "../../../hooks";
import styles from './DiagramCanvas.module.scss'

export const DiagramCanvas = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);

    const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), []);



    const {elementSize: canvasContainerSize, elementRef: canvasContainerRef} = useWidthAndHeight()

    return (
        <div
            className={styles.canvasContainer}
            ref={canvasContainerRef}
        >
            <div
                style={{
                    height: canvasContainerSize.height,
                    width: canvasContainerSize.width,
                }}
            >
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitView
                    attributionPosition="top-right"
                >
                    <Controls/>
                    <Background color="blue" gap={16}/>
                </ReactFlow>
            </div>
        </div>

    );
};

