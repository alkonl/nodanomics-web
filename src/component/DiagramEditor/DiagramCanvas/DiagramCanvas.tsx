import React, {DragEvent, useCallback, useRef, useState} from 'react';
import ReactFlow, {
    addEdge,
    Background,
    // eslint-disable-next-line import/named
    Connection, Edge, ReactFlowInstance, Node,
    Controls,
    useEdgesState,
    useNodesState
} from 'reactflow';

import 'reactflow/dist/style.css';
import {useWidthAndHeight} from "../../../hooks";
import styles from './DiagramCanvas.module.scss'
import {EDiagramNode, EElementType, EFontAlign, EFontStyle, INodeData} from "../../../interface";
import {VariableNode} from "../CutomNode";
import {createNode} from "../../../service";
import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../../../redux";


const nodeTypes: {
    [key in EDiagramNode]: React.FC<any>
} = {
    [EDiagramNode.Variable]: VariableNode,
    [EDiagramNode.Drain]: VariableNode,
    [EDiagramNode.Pool]: VariableNode,
}

let id = 0;
const getId = () => `dndnode_${id++}`;

export const DiagramCanvas = () => {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch()

    const [node2s, setNode2s, onNodesChange22] = useNodesState<INodeData[]>([]);
    const nodes = useDiagramEditorState().diagramNodes
    const {addNode, onNodesChange} = diagramEditorActions

    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>();
    const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), []);

    const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: DragEvent<HTMLDivElement>) => {
            const wrapperNode = reactFlowWrapper.current
            if (wrapperNode !== null && reactFlowInstance) {
                event.preventDefault();

                const type = event.dataTransfer.getData('application/reactflow') as EDiagramNode;

                // check if the dropped element is valid
                if (typeof type === 'undefined' || !Object.values(EDiagramNode).includes(type)) {
                    console.log(`Invalid element type: ${type}`)
                    return;
                }
                const newNode = createNode({
                    type,
                    reactFlowInstance,
                    event,
                    wrapperNode
                })
                if (newNode) {
                    dispatch(addNode(newNode))
                }
                // setNodes((nds) => {
                //     if (newNode) {
                //         return nds.concat(newNode)
                //     }
                //     return nds
                // });
            }
        },
        [reactFlowInstance]
    );

    const {elementSize: canvasContainerSize, elementRef: canvasContainerRef} = useWidthAndHeight()

    return (
        <div
            className={styles.canvasContainer}
            ref={canvasContainerRef}
        >
            <div
                style={{
                    flex: 1,
                }}
                ref={reactFlowWrapper}
            >
                <ReactFlow
                    nodeTypes={nodeTypes}
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
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
            </div>
        </div>

    );
};

