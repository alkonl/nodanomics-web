import React from 'react';
import {Box, Input, Typography} from "@mui/material";
// eslint-disable-next-line import/named
import {Handle, NodeProps, Position} from 'reactflow';
import {EDiagramNode, EElementType, IVariableNodeData} from "../../../../interface";
import {diagramEditorActions, useAppDispatch} from "../../../../redux";
import {useUpdateNode} from "../../../../hooks";

export const VariableNode: React.FC<NodeProps<IVariableNodeData>> = ({data, id, isConnectable}) => {
    const dispatch = useAppDispatch()

    const {style} = data
    const {textStyles} = style
    const {setEditElement} = diagramEditorActions
    const onClick = () => {
        dispatch(setEditElement({
            id,
            elementType: EElementType.Node,
        }))
    }

    const {updateNodeData} = useUpdateNode({nodeId: id})

    const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const number = Number(event.target.value)
        if (!isNaN(number)) {
            updateNodeData({
                type: EDiagramNode.Variable,
                value: number,
            })
        }

    }


    return (
        <Box onClick={onClick}>
            <Handle type="source" position={Position.Right} id="b" isConnectable={isConnectable}/>
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
                    type="text"
                    value={data.value || ''}
                    onChange={onChangeValue}
                />
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
