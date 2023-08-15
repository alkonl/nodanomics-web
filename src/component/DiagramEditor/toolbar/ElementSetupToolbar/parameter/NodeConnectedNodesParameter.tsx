import React from 'react';
import {ElementParameter} from "./ElementParameter";
import {IDiagramNodeBaseData} from "../../../../../interface";
import {Parameter} from "../styledComponents";

export const NodeConnectedNodesParameter: React.FC<{
    baseNodeData: IDiagramNodeBaseData
}> = ({baseNodeData}) => {




    return (
        <ElementParameter label="Connected Nodes">
            <Parameter.List items={baseNodeData?.connectedNodes} />
        </ElementParameter>
    );
};

