import {IReactFlowEdge, IReactFlowNode} from "../interface";
import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import {useCallback, useEffect, useRef} from "react";
import {IUpdateChildrenFunc, recursiveUpdateChildren} from "../service";


export const useOnSelectionChange = () => {
    const dispatch = useAppDispatch()
    const refPrevChangedNodes = useRef<string[]>([])
    const {diagramNodes: storeDiagramNodes} = useDiagramEditorState()
    const refDiagramNodes = useRef(storeDiagramNodes)

    useEffect(() => {
        refDiagramNodes.current = storeDiagramNodes
    }, [storeDiagramNodes]);


    return useCallback(({nodes}: {
        nodes: IReactFlowNode[],
        edges: IReactFlowEdge[],
    }) => {
        const selectedNode = nodes[0]
        if (!selectedNode) return


        const updatedPrevChangedNodes: IReactFlowNode[] = refDiagramNodes.current.filter(node => {
            return refPrevChangedNodes.current.includes(node.id)
        }).map(node => {
            return {
                ...node,
                zIndex: node.data.defaultZIndex,
            }
        })

        const updateChildrenFunc: IUpdateChildrenFunc = ({parentNode, node}) => {
            const parentZIndex = parentNode.data.defaultZIndex || 0
            const nodeZIndex = node.data.defaultZIndex || 0
            const newZIndex = parentZIndex + nodeZIndex + 1001
            return {
                ...node,
                zIndex: newZIndex,
            }
        }
        const selectedChanged = {
            ...selectedNode,
        }
        const updatedChildNodes = recursiveUpdateChildren(refDiagramNodes.current, selectedChanged, updateChildrenFunc)

        const updatedNodes: IReactFlowNode[] = [selectedChanged, ...updatedChildNodes]

        dispatch(diagramEditorActions.bulkUpdateNodes(updatedPrevChangedNodes))
        dispatch(diagramEditorActions.bulkUpdateNodes(updatedNodes))

        refPrevChangedNodes.current = updatedNodes.map(node => node.id)
    }, [dispatch])
}
