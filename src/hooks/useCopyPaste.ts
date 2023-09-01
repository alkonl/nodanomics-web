import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import {IReactFlowNode} from "../interface";
import {generateNodeId} from "../service";


const recreateNode = (node: IReactFlowNode) => {
    const newNode = {...node}
    newNode.id = generateNodeId();
    newNode.data.id = newNode.id;
    newNode.selected = false;
    newNode.position.x = newNode.position.x + 100;
    newNode.position.y = newNode.position.y + 100;
    return newNode;
}

const recreateNodes = (nodes: IReactFlowNode[]) => {
    return nodes.map(node => recreateNode(node))
}

export const useCopyPaste = () => {
    const {currentEditElement, diagramNodes} = useDiagramEditorState()
    const dispatch = useAppDispatch()
    const {addManyNodes} = diagramEditorActions
    const nodeToCopy = diagramNodes.filter(node => node.id === currentEditElement?.id)

    const copy = () => {
        navigator.clipboard.writeText(JSON.stringify(nodeToCopy));
    };

    const paste = async () => {
        const text = await navigator.clipboard.readText();
        const nodes = JSON.parse(text) as IReactFlowNode[]
        const formatted = recreateNodes(nodes)
        dispatch(addManyNodes(formatted))
    };

    return {copy, paste};
}
