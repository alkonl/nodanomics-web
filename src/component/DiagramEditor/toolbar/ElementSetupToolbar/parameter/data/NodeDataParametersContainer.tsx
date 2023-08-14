import React from 'react';
import {IDataNodeData} from "../../../../../../interface";
import {NodeDataCapacityParameters} from "./NodeDataCapacityParameters";
import {NodeDataValueParameter} from "./NodeDataValueParameter";

export const NodeDataParametersContainer: React.FC<{
    nodeData: IDataNodeData
}> = ({nodeData}) => {
    return (
        <>
            <NodeDataCapacityParameters nodeData={nodeData}/>
            <NodeDataValueParameter nodeData={nodeData}/>
        </>
    );
};

