import {IUpdateReactflowNode} from "../interface";
import {useGetChildrenNodes} from "./useGetChildrenNodes";
import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import {useToggle} from "./useToggle";
import {useUpdateNode} from "./useUpdateNode";

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

    const {diagramNodes} = useDiagramEditorState()

    const expandOrCollapse = ({parentId}: { parentId: string }) => {
        const parentNode = diagramNodes.find(node => node.id === parentId)

        expandOrCollapseManager.toggle()
        const children = getChildrenNodes({parentId})
        const updatedNodes: IUpdateReactflowNode[] = children.map((childNode) => {
            return {
                id: childNode.id,
                hidden: expandOrCollapseManager.isOpened,
            }
        })
        if(parentNode){
            updatedNodes.push({
                id: parentId,
                data: {
                    ...parentNode.data,
                    isCollapsed: !expandOrCollapseManager.isOpened
                }
            })
        }
        dispatch(bulkUpdateNodes(updatedNodes))
    }

    return {
        expandOrCollapse: expandOrCollapse,
        isExpanded: expandOrCollapseManager.isOpened
    }
}
