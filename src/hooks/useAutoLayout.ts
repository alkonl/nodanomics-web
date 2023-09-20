import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import lodash from "lodash";
import {createGraphLayout} from "../service";

export const useAutoLayout = () => {
    const {diagramNodes, diagramEdges} = useDiagramEditorState()
    const dispatch = useAppDispatch()
    return async () => {
        const filteredEdges = diagramEdges.filter((edge) => {
            return diagramNodes.find((node) => node.id === edge.source) && diagramNodes.find((node) => node.id === edge.target)
        })
        const structured = await createGraphLayout({
            nodes: lodash.cloneDeep(diagramNodes),
            edges: lodash.cloneDeep(filteredEdges),
        })
        dispatch(diagramEditorActions.bulkUpdateNodes(structured.nodes))
    }
}


