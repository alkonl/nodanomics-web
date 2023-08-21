import React from 'react';
import {IFormulaNodeData} from "../../../../../../interface";
import {NodeFormulaExpressionParameter} from "./NodeFormulaExpressionParameter";
import {NodeDecimalParameter} from "../NodeDecimalParameter";

export const NodeFormulaParameterContainer: React.FC<{
    nodeData: IFormulaNodeData
}> = ({nodeData}) => {
    return (
        <>
            <NodeFormulaExpressionParameter nodeData={nodeData}/>
            <NodeDecimalParameter nodeData={nodeData}/>
        </>
    );
};
