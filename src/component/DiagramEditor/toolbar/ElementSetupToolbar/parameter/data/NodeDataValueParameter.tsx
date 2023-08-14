import React from 'react';
import {IDataNodeData, IResource} from "../../../../../../interface";
import {ElementParameter} from "../ElementParameter";
import {Parameter} from "../../styledComponents";
import {useUpdateNode} from "../../../../../../hooks";
import {generateResourceFromSource} from "../../../../../../service";

export const NodeDataValueParameter: React.FC<{
    nodeData: IDataNodeData
}> = ({nodeData}) => {

    const {updateNodeData} = useUpdateNode<IDataNodeData>({
        nodeId: nodeData.id,
    })

    const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const countToGenerate = Number(event.target.value)
        const newResources: IResource[] = generateResourceFromSource(countToGenerate)
        updateNodeData({
            resources: newResources,
            initialResources: newResources,
        })
    }


    return (
        <ElementParameter label="Value">
            <Parameter.Input
                type="number"
                value={nodeData.resources.length || ''}
                onChange={onChangeValue}
            />

        </ElementParameter>
    )
}
