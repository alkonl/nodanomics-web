import React from 'react';
import {ITransferNodeData} from "../../../../../../interface";
import {TransferNodeIsExecuteWhenPassZeroParameter} from "./TransferNodeIsExecuteWhenPassZeroParameter";

export const NodeTransferParametersContainer: React.FC<{
    nodeData: ITransferNodeData
}> = ({nodeData}) => {
    return (
        <>
            <TransferNodeIsExecuteWhenPassZeroParameter nodeData={nodeData}/>
        </>
    );
};
