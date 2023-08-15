import {useUpdateNode} from "./useUpdateNode";
import {IDataNodeData, IResource, isIDataNodeData} from "../interface";
import {generateResourceFromSource} from "../service";
import {useDiagramEditorState} from "../redux";

export const useChangeNodeDataStep = ({
                                          nodeData
                                      }: {
    nodeData: IDataNodeData
}) => {
    const nodeDataToUpdate = nodeData
    // const {diagramNodes} = useDiagramEditorState()
    // const updatedNode = diagramNodes.find(node => node.id === nodeId)
    // const nodeDataToUpdate = updatedNode?.data
    //
    const {updateNodeData} = useUpdateNode<IDataNodeData>({
        nodeId: nodeDataToUpdate.id,
    })

    // if (updatedNode || !nodeDataToUpdate || !isIDataNodeData(nodeDataToUpdate)) {
    //     throw new Error(`Node type "Data" with id ${nodeId} not found`)
    // }
    const step = nodeDataToUpdate.step || 0


    const changeNodeDataStep = (value: number) => {
        updateNodeData({
            step: Math.round(value)
        })
    }

    const increaseNodeDataStep = () => {
        console.log('increaseNodeDataStep')
        const initialResources = nodeDataToUpdate.initialResources || []
        const newResources: IResource[] = generateResourceFromSource(step)
        const resourcesToUpdate = [...initialResources, ...newResources]
        updateNodeData({
            resources: resourcesToUpdate,
            initialResources: resourcesToUpdate,
        })
    }

    const decreaseNodeDataStep = () => {
        const initialResources = nodeDataToUpdate.initialResources
        if (initialResources) {
            const resourcesToUpdate = initialResources.slice(0, initialResources.length - step)
            updateNodeData({
                resources: resourcesToUpdate,
                initialResources: resourcesToUpdate,
            })
        }
    }

    return {
        changeNodeDataStep,
        increaseNodeDataStep,
        decreaseNodeDataStep
    }
}
