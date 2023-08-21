import React, {useMemo} from 'react';
import {ElementParameter} from "./ElementParameter";
import {EDiagramNode, INodeData} from "../../../../../interface";
import {Parameter} from "../styledComponents";

export const NodeConnectedNodesParameter: React.FC<{
    baseNodeData: INodeData
}> = ({baseNodeData}) => {

    const values = useMemo(()=>{
        if (baseNodeData.type === EDiagramNode.Formula) {
            return baseNodeData.variables?.map(variable => `${variable.variableName} = ${variable.value}`)
        }
        return   baseNodeData.connectedNodes
    },[baseNodeData])

    return (
        <ElementParameter label="Connected Nodes">
            <Parameter.List items={values}/>
        </ElementParameter>
    );
};

