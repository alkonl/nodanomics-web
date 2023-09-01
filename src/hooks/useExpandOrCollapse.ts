import {IDiagramNodeBaseData} from "../interface";
import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import {useGetNodesEdges} from "./useGetNodesEdges";
import {geAllChildrenNodes, IUpdateChildrenFunc, recursiveUpdateChildren} from "../service";

export const useExpandOrCollapse = ({nodeData}: {
    nodeData: IDiagramNodeBaseData
}) => {
    const dispatch = useAppDispatch()
    const {bulkUpdateNodes, bulkUpdateEdges} = diagramEditorActions

    const {diagramNodes} = useDiagramEditorState()
    const getNodesEdges = useGetNodesEdges()

    const expandOrCollapse = () => {
        const nodeId = nodeData.id
        const parentNode = diagramNodes.find(node => node.id === nodeId)

        if (!parentNode) return

        const childrenNodes = geAllChildrenNodes({parentId: nodeId, nodes: diagramNodes})
        const childrenEdges = getNodesEdges({nodes: childrenNodes})

        const updatedIsCollapsed = !nodeData.isCollapsed
        const updateChildrenFunc: IUpdateChildrenFunc = ({parentNode, node}) => {
            const isToHide = parentNode.id === nodeId ? updatedIsCollapsed : true;

            return {
                ...node,
                id: node.id,
                hidden: isToHide,
                data: {
                    ...node.data,
                    isCollapsed: true,
                }
            }
        }

        const nodesToHide = recursiveUpdateChildren(diagramNodes, parentNode, updateChildrenFunc)

        const edgesToHide = childrenEdges.map((edge) => {
            return {
                id: edge.id,
                hidden: updatedIsCollapsed,
            }
        })
        if (parentNode) {
            nodesToHide.push({
                ...parentNode,
                id: nodeId,
                data: {
                    ...parentNode.data,
                    isCollapsed: updatedIsCollapsed,
                }
            })
        }
        dispatch(bulkUpdateEdges(edgesToHide))
        dispatch(bulkUpdateNodes(nodesToHide))

    }

    return {
        expandOrCollapse,
    }
}
