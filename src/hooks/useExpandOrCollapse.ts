import {IUpdateReactflowNode} from "../interface";
import {useGetChildrenNodes} from "./useGetChildrenNodes";
import {diagramEditorActions, useAppDispatch} from "../redux";
import {useToggle} from "./useToggle";

export const useExpandOrCollapse = (props?: {
    initialIsOpened?: boolean
}) => {
    const initialIsOpened = props?.initialIsOpened || false
    const dispatch = useAppDispatch()
    const {bulkUpdateNodes} = diagramEditorActions

    const getChildrenNodes = useGetChildrenNodes()


    const expandOrCollapseManager = useToggle({
        initialState: initialIsOpened
    })

    const expandOrCollapse = ({parentId}: { parentId: string }) => {
        expandOrCollapseManager.toggle()
        const children = getChildrenNodes({parentId})
        const updatedNodes: IUpdateReactflowNode[] = children.map((childNode) => {
            return {
                id: childNode.id,
                hidden: !expandOrCollapseManager.isExpanded,
            }
        })
        updatedNodes.push({
            id: parentId,
            data: {
                isCollapsed: !expandOrCollapseManager.isExpanded
            }
        })
        dispatch(bulkUpdateNodes(updatedNodes))
    }

    return {
        expandOrCollapse: expandOrCollapse,
        isExpanded: expandOrCollapseManager.isExpanded
    }
}
