import {useDiagramEditorState} from "../redux";

export const useGetChildrenNodes = () => {
    const {diagramNodes} = useDiagramEditorState()
    return ({parentId}: { parentId: string }) => {
        return diagramNodes.filter((diagramNode) => diagramNode.parentNode === parentId)
    }
}
