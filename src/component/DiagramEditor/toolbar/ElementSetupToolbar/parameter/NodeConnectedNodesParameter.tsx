import React, {useMemo} from 'react';
import {ElementParameter} from "./ElementParameter";
import {INodeData, isINodeIncomingVariables, isINodeNumberVariable} from "../../../../../interface";
import {Parameter} from "../../../../base";

export const NodeConnectedNodesParameter: React.FC<{
    baseNodeData: INodeData
}> = ({baseNodeData}) => {

    const values = useMemo(() => {
        if (isINodeNumberVariable(baseNodeData)) {
            return baseNodeData.variables?.map(variable => `${variable.variableName} = ${variable.value}`)
        } else if (isINodeIncomingVariables(baseNodeData)) {
            return baseNodeData.incomingVariables?.map(variable => `${variable.variableName} = ${variable.value}`)
        }
        return baseNodeData.connectedNodes
    }, [baseNodeData])

    return (
        <>
            <ElementParameter label="Connected Nodes">
                <Parameter.List items={values}/>
            </ElementParameter>
        </>
    );
};

