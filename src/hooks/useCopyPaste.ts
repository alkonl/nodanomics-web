import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import {IReactFlowNode} from "../interface";
import {generateNodeId} from "../service";
import {useMemo} from "react";
import {useReactFlowInstance} from "./useReactFlowInstance";
// eslint-disable-next-line import/named
import {ReactFlowInstance, XYPosition} from "reactflow";
import {useMousePosition} from "./useMousePosition";

interface MousePosition {
    x: number;
    y: number;
}

const recreateNode = (node: IReactFlowNode, position: XYPosition) => {
    const newNode = {...node}
    newNode.id = generateNodeId();
    newNode.data.id = newNode.id;
    newNode.selected = false;
    newNode.position.x = position.x;
    newNode.position.y = position.y;
    return newNode;
}

const recreateNodes = ({nodes, reactFlowInstance, reactFlowWrapper, mousePosition}: {
    reactFlowInstance: ReactFlowInstance
    reactFlowWrapper: HTMLDivElement
    mousePosition: MousePosition
    nodes: IReactFlowNode[]
}) => {
    const reactFlowBounds = reactFlowWrapper.getBoundingClientRect();
    const position = reactFlowInstance.project({
        x: mousePosition.x - reactFlowBounds.left,
        y: mousePosition.y - reactFlowBounds.top,
    });
    console.log('position: ', position)
    return nodes.map(node => recreateNode(node, position))
}

export const useCopyPaste = () => {
    const {reactFlowWrapper, reactFlowInstance} = useReactFlowInstance().data
    const {currentEditElement, diagramNodes} = useDiagramEditorState()
    const dispatch = useAppDispatch()
    const {addManyNodes} = diagramEditorActions
    const mousePosition = useMousePosition()
    const nodeToCopy = useMemo(() => {
        return diagramNodes.filter(node => node.id === currentEditElement?.id)
    }, [currentEditElement])

    const copy = () => {
        navigator.clipboard.writeText(JSON.stringify(nodeToCopy));
    };

    const paste = async () => {
        const text = await navigator.clipboard.readText();
        const nodes = JSON.parse(text) as IReactFlowNode[]
        if (reactFlowInstance && reactFlowWrapper && reactFlowWrapper.current !== null) {
            const formatted = recreateNodes({
                nodes,
                reactFlowInstance,
                reactFlowWrapper: reactFlowWrapper.current,
                mousePosition,
            })
            dispatch(addManyNodes(formatted))
        }

    };

    return {copy, paste};
}
