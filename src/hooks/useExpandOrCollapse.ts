import {IUpdateReactflowNode} from "../interface";
import {useGetChildrenNodes} from "./useGetChildrenNodes";
import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import {useToggle} from "./useToggle";
import {useGetNodesEdges} from "./useGetNodesEdges";

export const useExpandOrCollapse = (props?: {
    initialIsOpened?: boolean
}) => {
    const initialIsOpened = props?.initialIsOpened || false
    const dispatch = useAppDispatch()
    const {bulkUpdateNodes, bulkUpdateEdges} = diagramEditorActions

    const getChildrenNodes = useGetChildrenNodes()


    const expandOrCollapseManager = useToggle({
        initialState: initialIsOpened
    })

    const {diagramNodes} = useDiagramEditorState()
    const getNodesEdges = useGetNodesEdges()

    const expandOrCollapse = ({parentId}: { parentId: string }) => {
        const parentNode = diagramNodes.find(node => node.id === parentId)
        const childrenNodes = getChildrenNodes({parentId})
        const childrenEdges = getNodesEdges({nodes: childrenNodes})
        expandOrCollapseManager.toggle()
        const nodesToHide: IUpdateReactflowNode[] = childrenNodes.map((childNode) => {
            return {
                id: childNode.id,
                hidden: !expandOrCollapseManager.isOpened,
            }
        })
        const edgesToHide = childrenEdges.map((edge) => {
            return {
                id: edge.id,
                hidden: !expandOrCollapseManager.isOpened,
            }
        })
        if (parentNode) {
            nodesToHide.push({
                id: parentId,
                data: {
                    ...parentNode.data,
                    isCollapsed: !expandOrCollapseManager.isOpened
                }
            })
        }
        dispatch(bulkUpdateEdges(edgesToHide))
        dispatch(bulkUpdateNodes(nodesToHide))
    }

    return {
        expandOrCollapse: expandOrCollapse,
        isExpanded: expandOrCollapseManager.isOpened
    }
}
