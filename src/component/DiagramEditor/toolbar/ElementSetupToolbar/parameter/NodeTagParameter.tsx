import React from 'react';
import {useUpdateNode} from "../../../../../hooks";
import {INodeData} from "../../../../../interface";
import {ElementParameter} from "./ElementParameter";
import {Parameter} from "../../../../base";
import {convertToCamelCase} from "../../../../../utils";

export const NodeTagParameter: React.FC<{
    nodeData: INodeData
}> = ({nodeData}) => {

    const {updateNodeData} = useUpdateNode({
        nodeId: nodeData.id,
    })
    const onTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const formattedTag = convertToCamelCase(event.target.value)
        updateNodeData({
            tag: formattedTag,
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
