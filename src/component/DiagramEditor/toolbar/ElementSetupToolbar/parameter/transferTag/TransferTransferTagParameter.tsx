import React from "react";
import {ITransferNodeData} from "../../../../../../interface";
import {useUpdateNode} from "../../../../../../hooks";
import {ElementParameter} from "../ElementParameter";
import {Parameter} from "../../../../../base";

export const TransferTransferTagParameter: React.FC<{
    nodeData: ITransferNodeData
}> = ({nodeData}) => {

    const {updateNodeData} = useUpdateNode<ITransferNodeData>({
        nodeId: nodeData.id,
    })

    const onChangeTransferTag = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateNodeData({
            transferTag: event.target.value,
        })
    }


    return (
        <ElementParameter label="Transfer Tag">
            <Parameter.Input
                value={nodeData.transferTag || ''}
                onChange={onChangeTransferTag}
            />
        </ElementParameter>
    )
}
