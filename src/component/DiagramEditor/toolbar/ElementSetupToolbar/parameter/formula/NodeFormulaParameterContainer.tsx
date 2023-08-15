import React from 'react';
import {IFormulaNodeData} from "../../../../../../interface";
import {NodeFormulaExpressionParameter} from "./NodeFormulaExpressionParameter";

export const NodeFormulaParameterContainer: React.FC<{
    nodeData: IFormulaNodeData
}> = ({nodeData}) => {
    return (
        <>
            <NodeFormulaExpressionParameter nodeData={nodeData}/>
        </>
    );
};
