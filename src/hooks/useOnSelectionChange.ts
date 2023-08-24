import {IReactFlowEdge, IReactFlowNode} from "../interface";
import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import {useCallback, useEffect, useRef} from "react";

export type IUpdateChildrenFunc = (params: {
    parentNode: IReactFlowNode,
    node: IReactFlowNode,
}) => IReactFlowNode

const recursiveUpdateChildren = (nodes: IReactFlowNode[], parentNode: IReactFlowNode, func: IUpdateChildrenFunc): IReactFlowNode[] => {
    const childrenNodes = nodes.filter(node => node.data.parentId === parentNode.id)
    const updatedNodes: IReactFlowNode[] = childrenNodes.map(node => func({
        parentNode: parentNode,
        node: node,
    }))

    return updatedNodes.concat(...childrenNodes.map(node => recursiveUpdateChildren(nodes, node, func)))
}

export const useOnSelectionChange = () => {
    const dispatch = useAppDispatch()
    const refPrevChangedNodes = useRef<string[]>([])
    const {diagramNodes: storeDiagramNodes} = useDiagramEditorState()
    const refDiagramNodes = useRef(storeDiagramNodes)

    useEffect(() => {
        refDiagramNodes.current = storeDiagramNodes
    }, [storeDiagramNodes]);

    // Bug: infinite update loop
    return useCallback(({nodes}: {
        nodes: IReactFlowNode[],
        edges: IReactFlowEdge[],
    }) => {
        const selectedNode = nodes[0]
        console.log("useOnSelectionChange.nodes", nodes)
        if (!selectedNode) return


        const updatedPrevChangedNodes: IReactFlowNode[] = refDiagramNodes.current.filter(node => {
            return refPrevChangedNodes.current.includes(node.id)
        }).map(node => {
            const zIndex = node.zIndex
            return {
                ...node,
                zIndex: zIndex ? zIndex - 1000 : undefined,
            }
        })

        const updateChildrenFunc: IUpdateChildrenFunc = ({parentNode, node}) => {
            const zIndex = parentNode.zIndex || 0
            return {
                ...node,
                zIndex: zIndex >= 2001 ? zIndex + 1 : 2001,
            }
        }
        const selectedChanged = {
            ...selectedNode,
            zIndex: 1000,
        }
        const updatedChildNodes = recursiveUpdateChildren(refDiagramNodes.current, selectedChanged, updateChildrenFunc)

        // const filteredPrevChangedNodes = updatedPrevChangedNodes.filter(node => !updatedChildNodes.find(childNode => childNode.id === node.id))

        console.log("useOnSelectionChange.toUpdate", updatedChildNodes);
        const updatedNodes: IReactFlowNode[] = [selectedChanged, ...updatedChildNodes]

        dispatch(diagramEditorActions.bulkUpdateNodes(updatedNodes))
        dispatch(diagramEditorActions.bulkUpdateNodes(updatedPrevChangedNodes))
        refPrevChangedNodes.current = updatedNodes.map(node => node.id)
    }, [dispatch])
}
