import React from 'react';
import {IEventListenerNodeData} from "../../../../../../interface";
import {NodeEventNameParameter} from "../generic";

export const NodeEventListenerParametersContainer: React.FC<{
    nodeData: IEventListenerNodeData
}> = ({nodeData}) => {
    return (
        <>
            <NodeEventNameParameter nodeData={nodeData}/>
        </>
    );
};
