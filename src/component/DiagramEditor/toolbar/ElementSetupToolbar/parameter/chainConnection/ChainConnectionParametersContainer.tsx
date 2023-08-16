import React from 'react';
import {IChainConnectionData} from "../../../../../../interface";
import {ChainConnectionConditionParameter} from "./ChainConnectionConditionParameter";

export const ChainConnectionParametersContainer: React.FC<{
    edgeData: IChainConnectionData
}> = ({edgeData}) => {
    return (
        <>
            <ChainConnectionConditionParameter edgeData={edgeData}/>
        </>
    );
};
