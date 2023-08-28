import React from 'react';
import {useUpdateNode} from "../../../../../hooks";
import {ENodeTrigger, INodeData} from "../../../../../interface";
import {ElementParameter} from "./ElementParameter";
import {Parameter} from "../../../../base";

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
        <ElementParameter label="Tag">
                <Parameter.Input
                    value={nodeData.tag || ''}
                    onChange={onTagChange}
                />
        </ElementParameter>

    );
};
