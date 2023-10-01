import React, {useMemo} from 'react';
import {ElementParameter} from "./ElementParameter";
import {INodeData, isINodeIncomingVariables, isINodeNumberVariable} from "../../../../../interface";
import {Parameter} from "../../../../base";

export const NodeConnectedNodesParameter: React.FC<{
    baseNodeData: INodeData
}> = ({baseNodeData}) => {

    const values = useMemo(() => {
        if (isINodeNumberVariable(baseNodeData)) {
            return baseNodeData.variables?.map(variable => ({
                label: variable.variableName,
                value: variable.value + variable.variableName
            }))
        } else if (isINodeIncomingVariables(baseNodeData)) {
            return baseNodeData.incomingVariables?.map(variable => ({
                label: variable.variableName,
                value: variable.value + variable.variableName
            }))
        }
        return baseNodeData.connectedNodes?.map(node => ({
            label: node.label,
            value: node.id
        }))
    }, [baseNodeData])

    return (
        <>
            {values && <ElementParameter label="Connected Nodes">
                <Parameter.List items={values}/>
            </ElementParameter>}
        </>
    );
};

