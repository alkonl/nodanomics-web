import React from 'react';
import {IDataNodeData} from "../../../../../../interface";
import {ElementParameter} from "../ElementParameter";
import {useChangeNodeDataStep} from "../../../../../../hooks";
import {Parameter} from "../../../../../base";

export const NodeDataValueParameter: React.FC<{
    nodeData: IDataNodeData
}> = ({nodeData}) => {


    const {changeValue} = useChangeNodeDataStep({
        nodeData,
    })
    // const {updateNodeData} = useUpdateNode<IDataNodeData>({
    //     nodeId: nodeData.id,
    // })
    //
    // const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const countToGenerate = Number(event.target.value)
    //     const newResources: IResource[] = generateResourceFromSource(countToGenerate)
    //     updateNodeData({
    //         resources: newResources,
    //         initialResources: newResources,
    //     })
    // }


    return (
        <ElementParameter label="Value">
            <Parameter.Input
                type="number"
                value={nodeData.resources.value}
                onChange={changeValue}
            />

        </ElementParameter>
    )
}
