import {IReactFlowEdge, IReactFlowNode} from "../interface";
import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import {useCallback, useEffect, useRef} from "react";
import {IUpdateChildrenFunc, recursiveUpdateChildren} from "../service";


// export const recursiveUpdateChildren = (nodes: IReactFlowNode[], parentNode: IReactFlowNode, func: IUpdateChildrenFunc): IReactFlowNode[] => {
//     const childrenNodes = nodes.filter(node => node.data.parentId === parentNode.id)
//     const updatedNodes: IReactFlowNode[] = childrenNodes.map(node => func({
//         parentNode: parentNode,
//         node: node,
//     }))
//
//     return updatedNodes.concat(...childrenNodes.map(node => recursiveUpdateChildren(nodes, node, func)))
// }

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
            const zIndex = node.zIndex || 0
            return {
                ...node,
                zIndex: node.defaultZIndex,
            }
        })

        const updateChildrenFunc: IUpdateChildrenFunc = ({parentNode, node}) => {
            const parentZIndex = parentNode.zIndex || 1000
            const nodeZIndex = node.zIndex || 1
            const newZIndex = parentZIndex + nodeZIndex
            console.log('zIndex: ', newZIndex)
            return {
                ...node,
                zIndex: newZIndex,
                defaultZIndex: nodeZIndex,
            }
        }
        const selectedChanged = {
            ...selectedNode,
        }
        const updatedChildNodes = recursiveUpdateChildren(refDiagramNodes.current, selectedChanged, updateChildrenFunc)
        console.log('selectedNode.zIndex', selectedChanged.zIndex, updatedChildNodes)

        // const filteredPrevChangedNodes = updatedPrevChangedNodes.filter(node => !updatedChildNodes.find(childNode => childNode.id === node.id))


        const updatedNodes: IReactFlowNode[] = [selectedChanged, ...updatedChildNodes]
        console.log("useOnSelectionChange.toUpdate", updatedNodes);
        dispatch(diagramEditorActions.bulkUpdateNodes(updatedPrevChangedNodes))
        dispatch(diagramEditorActions.bulkUpdateNodes(updatedNodes))

        refPrevChangedNodes.current = updatedNodes.map(node => node.id)
    }, [dispatch])
}
