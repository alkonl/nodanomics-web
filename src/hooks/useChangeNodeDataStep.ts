import {useUpdateNode} from "./useUpdateNode";
import {IDataNodeData, IResource} from "../interface";
import {generateResourceFromSource} from "../service";
import React from "react";

export const useChangeNodeDataStep = ({
                                          nodeData
                                      }: {
    nodeData: IDataNodeData
}) => {
    const nodeDataToUpdate = nodeData
    const {updateNodeData} = useUpdateNode<IDataNodeData>({
        nodeId: nodeDataToUpdate.id,
    })

    const step = nodeDataToUpdate.step || 0


    const changeNodeDataStep = (value: number) => {
        updateNodeData({
            step: Math.round(value)
        })
    }

    const increaseNodeDataStep = () => {
        const initialResources = nodeDataToUpdate.initialResources || []
        const newResources: IResource[] = generateResourceFromSource(step)
        const resourcesToUpdate = [...initialResources, ...newResources]
        updateNodeData({
            resources: resourcesToUpdate,
            initialResources: resourcesToUpdate,
            resourcesToProvide: resourcesToUpdate,
        })
    }

    const decreaseNodeDataStep = () => {
        const initialResources = nodeDataToUpdate.initialResources
        if (initialResources) {
            const resourcesToUpdate = initialResources.slice(0, initialResources.length - step)
            updateNodeData({
                resources: resourcesToUpdate,
                initialResources: resourcesToUpdate,
                resourcesToProvide: resourcesToUpdate,
            })
        }
    }

    const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const countToGenerate = Number(event.target.value)
        const newResources: IResource[] = generateResourceFromSource(countToGenerate)
        updateNodeData({
            resources: newResources,
            initialResources: newResources,
        })
    }

    return {
        changeNodeDataStep,
        increaseNodeDataStep,
        decreaseNodeDataStep,
        changeValue,
    }
}
