import React from 'react';
import {ForLoopLoopsParameter} from "./ForLoopLoopsParameter";
import {IMicroLoopNodeData} from "../../../../../../interface";
import {ForLoopIsAccumulativeParameter} from "./ForLoopIsAccumulativeParameter";

export const ForLoopParameterContainer : React.FC<{
    nodeData: IMicroLoopNodeData
}> = ({nodeData}) => {
    return (
        <>
            <ForLoopLoopsParameter nodeData={nodeData} />
            <ForLoopIsAccumulativeParameter nodeData={nodeData}/>
        </>
    );
};
