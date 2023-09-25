import React, {ChangeEventHandler} from 'react';
import {BaseNodeContainer} from "../container";
import type {NodeProps} from "reactflow";
import {IDataNodeData, ILabelNodeData} from "../../../../interface";
import {Box} from "@mui/material";
import {Parameter} from "../../../base";
import {GAP_BETWEEN_EDITOR_CANVAS_DOTS} from "../../../../constant";
import {useUpdateNode} from "../../../../hooks";

export const LabelNode: React.FC<NodeProps<ILabelNodeData>> = (props) => {


    const {updateNodeData} = useUpdateNode<ILabelNodeData>({
        nodeId: props.id
    })

    const onCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateNodeData({
            comment: event.target.value,
        })
    }

    return (
        <BaseNodeContainer node={props}>
            <Box sx={{
                width: GAP_BETWEEN_EDITOR_CANVAS_DOTS * 10,
                height: 'fit-content',
            }}>
                <Parameter.TextArea
                    sx={{
                        width: '100%',
                        fontSize: 14,
                    }}
                    onChange={onCommentChange}
                    value={props.data.comment}
                />
            </Box>
        </BaseNodeContainer>
    );
};

