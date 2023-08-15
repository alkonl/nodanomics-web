import {IDiagramNodeBaseData, IUpdateReactflowNode} from "../interface";
import {useGetChildrenNodes} from "./useGetChildrenNodes";
import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import {useToggle} from "./useToggle";
import {useGetNodesEdges} from "./useGetNodesEdges";

export const useExpandOrCollapse = ({nodeData}: {
    nodeData: IDiagramNodeBaseData
}) => {
    const dispatch = useAppDispatch()
    const {bulkUpdateNodes, bulkUpdateEdges} = diagramEditorActions

    const getChildrenNodes = useGetChildrenNodes()


    // const expandOrCollapseManager = useToggle({
    //     initialState: initialIsOpened
    // })

    const {diagramNodes} = useDiagramEditorState()
    const getNodesEdges = useGetNodesEdges()

    const expandOrCollapse = ({parentId}: { parentId: string }) => {
        const parentNode = diagramNodes.find(node => node.id === parentId)
        const childrenNodes = getChildrenNodes({parentId})
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
                id: parentId,
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
