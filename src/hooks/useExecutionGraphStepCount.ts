import {EDiagramNode, IDataNodeData, IReactFlowCurtainNode} from "../interface";
import {useDiagramEditorState} from "../redux";

export const useExecutionGraphStepCount = () => {
    const {diagramNodes, currentRunningDiagramStep} = useDiagramEditorState()

    const assignedNode = diagramNodes
        .find(node => node.data.type === EDiagramNode.Data && node.data.isAssigned) as IReactFlowCurtainNode<IDataNodeData> || undefined
   return  assignedNode
        ? assignedNode.data.changeCount || 0
        : currentRunningDiagramStep
}
