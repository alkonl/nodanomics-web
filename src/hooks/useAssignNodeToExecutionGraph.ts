import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import {EDiagramNode, IDataNodeData, IReactFlowCurtainNode} from "../interface";
import {useGetAssignedNode} from "./useGetAssignedNode";

export const useAssignNodeToExecutionGraph = () => {
    const {diagramNodes} = useDiagramEditorState()
    const dispatch = useAppDispatch()
    const assignedNode = useGetAssignedNode()
    const dataTags = diagramNodes
        .filter((node) => node.data.type === EDiagramNode.Data && node.data.tag)
        .map((node) => ({label: node.data.tag, id: node.data.id})) as {
        label: string,
        id: string
    }[]

    const changeAssignNode = (nodeId?: string) => {
        const dataNodes = diagramNodes.filter((node) => node.data.type === EDiagramNode.Data) as IReactFlowCurtainNode<IDataNodeData>[]
        const mappedNodes = dataNodes.map((node) => {
            if (node.data.id === nodeId) {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        isAssigned: true
                    }
                }
            }
            return {
                ...node,
                data: {
                    ...node.data,
                    isAssigned: undefined,
                    changeCount: undefined,
                }
            }
        })
        dispatch(diagramEditorActions.bulkUpdateNodes(mappedNodes))
    }

    // const currentAssignedNode = diagramNodes.find((node) => node.data.type === EDiagramNode.Data && node.data.isAssigned)
    const formattedCurrentAssignedNode = assignedNode
        ? {
            label: assignedNode.data.tag,
            id: assignedNode.data.id
        } : undefined
    return {
        dataTags,
        changeAssignNode,
        currentAssignedNode: formattedCurrentAssignedNode,
    }
}
