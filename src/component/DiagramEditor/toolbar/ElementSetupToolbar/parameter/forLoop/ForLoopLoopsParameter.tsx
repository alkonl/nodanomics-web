import React from 'react';
import {ElementParameter} from "../ElementParameter";
import {IMicroLoopNodeData} from "../../../../../../interface";
import {Parameter} from "../../styledComponents";
import {useUpdateNode} from "../../../../../../hooks";

export const ForLoopLoopsParameter: React.FC<{
    nodeData: IMicroLoopNodeData
}> = ({nodeData}) => {

    const {updateNodeData} = useUpdateNode<IMicroLoopNodeData>({
        nodeId: nodeData.id,
    })
    const onLoopCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            updateNodeData({
                loopFormula: event.target.value,
            })
    }
    return (
        <ElementParameter label="Loops">
            <Parameter.Input
                value={nodeData.loopFormula || ''}
                onChange={onLoopCountChange}
            />
        </ElementParameter>
    );
};
