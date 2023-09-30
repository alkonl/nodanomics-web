import React from 'react';
import {IMicroLoopNodeData} from "../../../../../../interface";
import {Parameter} from "../../../../../base";
import {useUpdateNode} from "../../../../../../hooks";

export const ForLoopIsAccumulativeParameter: React.FC<{
    nodeData: IMicroLoopNodeData
}> = ({nodeData}) => {
    const {updateNodeData} = useUpdateNode<IMicroLoopNodeData>({
        nodeId: nodeData.id,
    })
    const changeIsReadOnly = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        updateNodeData({
            isAccumulative: checked,
        })
    }

    return (
        <Parameter.ElementContainer label="accumulate">
            <Parameter.Checkbox
                onChange={changeIsReadOnly}
                checked={nodeData.isAccumulative || false}
            />
        </Parameter.ElementContainer>
    );
};

