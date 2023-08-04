import {useDiagramEditorState} from "../redux";
import {IReactFlowNode} from "../interface";

export const useGetNodesEdges = () => {
    const {diagramEdges} = useDiagramEditorState()

    return ({nodes}: { nodes: IReactFlowNode[] }) => {
        return diagramEdges.filter((edge) => {
            return nodes.some((node) => {
                return node.id === edge.source || node.id === edge.target
            })
        })
    }
}
