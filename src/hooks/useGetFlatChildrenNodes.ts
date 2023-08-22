import {useDiagramEditorState} from "../redux";

export const useGetFlatChildrenNodes = () => {
    const {diagramNodes} = useDiagramEditorState()
    return ({parentId}: { parentId: string }) => {
        return diagramNodes.filter((diagramNode) => diagramNode.parentNode === parentId)
    }
}
