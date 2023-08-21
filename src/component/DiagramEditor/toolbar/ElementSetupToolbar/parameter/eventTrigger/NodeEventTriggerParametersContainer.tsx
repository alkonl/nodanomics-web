import React from 'react';
import {IEventTriggerNodeData} from "../../../../../../interface";
import {NodeEventNameParameter} from "../generic";
import {NodeEventConditionParameter} from "./NodeEventConditionParameter";

export const NodeEventTriggerParametersContainer: React.FC<{
    nodeData: IEventTriggerNodeData
}> = ({nodeData}) => {
    return (
        <>
            <NodeEventNameParameter nodeData={nodeData}/>
            <NodeEventConditionParameter     nodeData={nodeData}/>
        </>
    );
};
