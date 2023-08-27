import React from 'react';
import {IFormulaNodeData} from "../../../../../../interface";
import {NodeFormulaExpressionParameter} from "./NodeFormulaExpressionParameter";
import {NodeDecimalParameter} from "../NodeDecimalParameter";
import {NodeFormulaResultParameter} from "./NodeFormulaResultParameter";

export const NodeFormulaParameterContainer: React.FC<{
    nodeData: IFormulaNodeData
}> = ({nodeData}) => {
    return (
        <>
            <NodeFormulaExpressionParameter nodeData={nodeData}/>
            <NodeDecimalParameter nodeData={nodeData}/>
            <NodeFormulaResultParameter nodeData={nodeData}/>
        </>
    );
};
