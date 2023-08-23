import {IDiagramNodeBaseData, IUpdateReactflowNode} from "../interface";
import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import {useGetNodesEdges} from "./useGetNodesEdges";
import {geAllChildrenNodes} from "./useGeAllChildrenNodes";
import {resizeParent} from "../service";

export const useExpandOrCollapse = ({nodeData}: {
    nodeData: IDiagramNodeBaseData
}) => {
    const dispatch = useAppDispatch()
    const {bulkUpdateNodes, bulkUpdateEdges} = diagramEditorActions

    const {diagramNodes} = useDiagramEditorState()
    const getNodesEdges = useGetNodesEdges()

    const updateNodeSize = (params: {
        nodeId: string,
        size: { width: number, height: number }
    }) => {
        dispatch(diagramEditorActions.updateNodeSize(params))
    }

    const expandOrCollapse = () => {
        const nodeId= nodeData.id
        const parentNode = diagramNodes.find(node => node.id === nodeId)
        const childrenNodes = geAllChildrenNodes({parentId: nodeId, nodes: diagramNodes})
        const childrenEdges = getNodesEdges({nodes: childrenNodes})
        // expandOrCollapseManager.toggle()
        const updatedIsCollapsed = !nodeData.isCollapsed
        const nodesToHide: IUpdateReactflowNode[] = childrenNodes.map((childNode) => {
            return {
                id: childNode.id,
                hidden: updatedIsCollapsed,
            }
        })
        const edgesToHide = childrenEdges.map((edge) => {
            return {
                id: edge.id,
                hidden: updatedIsCollapsed,
            }
        })
        if (parentNode) {
            nodesToHide.push({
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
        expandOrCollapse: expandOrCollapse,
    }
}
