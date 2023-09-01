import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import {ICopiedElements} from "../interface";
import {geAllChildrenNodes, prepareCopiedNodesToPaste,} from "../service";
import {useMemo} from "react";
import {useReactFlowInstance} from "./useReactFlowInstance";
// eslint-disable-next-line import/named
import {useMousePosition} from "./useMousePosition";



export const useCopyPaste = () => {
    const {reactFlowWrapper, reactFlowInstance} = useReactFlowInstance().data
    const {currentEditElement, diagramNodes, diagramEdges} = useDiagramEditorState()
    const dispatch = useAppDispatch()
    const {addManyNodes, addManyEdges} = diagramEditorActions
    const mousePosition = useMousePosition()

    const nodeToCopy: ICopiedElements = useMemo(() => {
        if (currentEditElement) {
            const parentNodes = diagramNodes.filter(node => node.id === currentEditElement.id)
            const children = geAllChildrenNodes({nodes: diagramNodes, parentId: currentEditElement.id})
            const edgesToCopy = diagramEdges.filter(edge => children.some(node => node.id === edge.source || node.id === edge.target))
            return {
                nodes: [...parentNodes, ...children],
                edges: edgesToCopy,
            }
        }
        return {
            nodes: [],
            edges: [],
        }
    }, [currentEditElement])

    const copy = () => {
        navigator.clipboard.writeText(JSON.stringify(nodeToCopy));
    };

    const paste = async () => {
        const text = await navigator.clipboard.readText();
        const elements = JSON.parse(text) as ICopiedElements
        if (reactFlowInstance && reactFlowWrapper && reactFlowWrapper.current !== null) {
            const {nodes, edges} = elements
            const preparedToPaste = prepareCopiedNodesToPaste({
                elements: {nodes, edges},
                reactFlowInstance,
                reactFlowWrapper: reactFlowWrapper.current,
                mousePosition,
            })
            dispatch(addManyNodes(preparedToPaste.nodes))
            dispatch(addManyEdges(preparedToPaste.edges))
        }

    };

    return {copy, paste};
}
