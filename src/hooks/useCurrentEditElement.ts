import {useDiagramEditorState} from "../redux";
import {EElementType} from "../interface";

export const useCurrentEditElement = () => {
    const {currentEditElement, diagramNodes, diagramEdges} = useDiagramEditorState()
    if (currentEditElement) {
        const elementId = currentEditElement.id
        if (currentEditElement.elementType === EElementType.Node) {
            return diagramNodes.find(node => node.id === elementId)
        } else if (currentEditElement.elementType === EElementType.Connection) {
            return diagramEdges.find(edge => edge.id === elementId)
        }
    }
}
