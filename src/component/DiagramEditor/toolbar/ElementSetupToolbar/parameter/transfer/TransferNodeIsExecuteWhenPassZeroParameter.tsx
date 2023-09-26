import React from "react";
import {ITransferNodeData} from "../../../../../../interface";
import {useUpdateNode} from "../../../../../../hooks";
import {Parameter} from "../../../../../base";

export const TransferNodeIsExecuteWhenPassZeroParameter: React.FC<{
    nodeData: ITransferNodeData
}> = ({nodeData}) => {

    const {updateNodeData} = useUpdateNode<ITransferNodeData>({
        nodeId: nodeData.id,
    })

    const changeIsNodeAutomatic = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        updateNodeData({
            isExecuteOutgoingIfTransferredZero: checked,
        })
    }

    return (
        <Parameter.ElementContainer label="execute if transfered zero">
            <Parameter.Checkbox
                onChange={changeIsNodeAutomatic}
                checked={nodeData.isExecuteOutgoingIfTransferredZero}
            />
        </Parameter.ElementContainer>
    );
};
