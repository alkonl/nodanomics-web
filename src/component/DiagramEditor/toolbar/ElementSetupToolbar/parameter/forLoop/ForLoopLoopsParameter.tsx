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
        const loopCount = parseInt(event.target.value)
        if (loopCount > 0) {
            updateNodeData({
                loopCount: loopCount,
            })
        }
    }
    return (
        <ElementParameter label="Loops">
            <Parameter.Input
                type="number"
                value={nodeData.loopCount || ''}
                onChange={onLoopCountChange}
            />
        </ElementParameter>
    );
};
