import React from 'react';
import {IEventTriggerNodeData} from "../../../../../../interface";
import {NodeEventNameParameter} from "../generic";

export const NodeEventTriggerParametersContainer: React.FC<{
    nodeData: IEventTriggerNodeData
}> = ({nodeData}) => {
    return (
        <>
            <NodeEventNameParameter nodeData={nodeData}/>
        </>
    );
};
