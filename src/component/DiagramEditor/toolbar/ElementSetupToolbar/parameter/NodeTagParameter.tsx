import React from 'react';
import {Parameter} from "../styledComponents";
import {useUpdateNode} from "../../../../../hooks";
import {ENodeTrigger, INodeData} from "../../../../../interface";

export const NodeTagParameter: React.FC<{
    nodeData: INodeData
}> = ({nodeData}) => {

    const {updateNodeData} = useUpdateNode({
        nodeId: nodeData.id,
    })
    const onTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateNodeData({
            tag: event.target.value as ENodeTrigger,
        })
    }

    return (
        <Parameter.Container>
            <Parameter.Label>
                Tag
            </Parameter.Label>
            <Parameter.Input
                value={nodeData.tag || ''}
                onChange={onTagChange}
            />
        </Parameter.Container>
    );
};
