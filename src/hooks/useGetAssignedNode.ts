import {EDiagramNode} from "../interface";
import {useDiagramEditorState} from "../redux";

export const useGetAssignedNode = () => {
    const {diagramNodes} = useDiagramEditorState()
    return diagramNodes.find((node) => node.data.type === EDiagramNode.Data && node.data.isAssigned)
}
