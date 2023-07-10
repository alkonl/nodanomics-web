import React from 'react';
import {Box, Input, Typography} from "@mui/material";
// eslint-disable-next-line import/named
import {Node, NodeProps} from 'reactflow';
import {EDiagramNode, IVariableNodeData} from "../../../../interface";
import {diagramEditorActions, useAppDispatch} from "../../../../redux";
import {useUpdateNode} from "../../../../hooks";

export const VariableNode: React.FC<NodeProps<IVariableNodeData>> = ({data, id}) => {
    const dispatch = useAppDispatch()
    const {style} = data
    const {textStyles} = style
    const {setEditNode} = diagramEditorActions
    const onClick = () => {
        dispatch(setEditNode(id))
    }

    const {updateNodeData} = useUpdateNode({nodeId: id})

    const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateNodeData({
            type: EDiagramNode.Variable,
            value: event.target.value,
        })
    }

    return (
        <Box onClick={onClick}>
            <Box sx={{
                position: 'relative',

                backgroundColor: style.fillColor,
                color: textStyles.fontColor,
                borderWidth: style.borderWidth,
                borderColor: style.borderColor,
                borderStyle: 'solid',
                padding: '1px',
            }}>
                <Typography sx={{
                    fontSize: 10,
                    fontWeight: 'bold',
                }}>
                    Variable: {data.name}
                </Typography>
                <Input
                    value={data.value}
                    onChange={onChangeValue}
                />
                {/*VariableNode {data.value}*/}
            </Box>
            <Box sx={{
                height: '100%',
                bottom: '-100%',
                left: 0,
            }}>
                <Typography sx={{
                    textAlign: textStyles.fontAlign,
                    fontSize: 14,
                    maxWidth: '140px',
                }}>
                    {data.label}
                </Typography>
            </Box>
        </Box>
    );
};
