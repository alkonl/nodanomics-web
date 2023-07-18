import React, {useMemo} from 'react';
import {Box, Input, Typography} from "@mui/material";
// eslint-disable-next-line import/named
import {Handle, NodeProps, Position} from "reactflow";
import {EConnection, IFormulaNodeData} from "../../../../interface";
import {EColor, EFontColor} from "../../../../constant";
import {useUpdateNode} from "../../../../hooks";

export const FormulaNode: React.FC<NodeProps<IFormulaNodeData>> = ({isConnectable, data}) => {
    const result = useMemo(() => {
        if (data.result && data.result.type === 'number') {
            return data.result.value
        }
    }, [data])

    const {updateNodeData} = useUpdateNode({
        nodeId: data.id,
    })
    const onFormulaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateNodeData({
            formula: event.target.value,
        })
    }

    return (
        <Box sx={{
            padding: 1,
            backgroundColor: EColor.black,
            color: EFontColor.white,
            width: 200,
            maxHeight: 140,
        }}>
            <Handle
                type="target"
                position={Position.Left}
                isConnectable={isConnectable}
                id={EConnection.LogicConnection}
            />
            <Box>
                <Input
                    onChange={onFormulaChange}
                    sx={{
                    color: EFontColor.white,
                }}/>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <Box sx={{
                        overflow: 'auto',
                    }}>
                        list of inputs
                        {data.variables?.map((variable, index) => (
                            <Typography key={index}>
                                {variable.variableName} = {variable.value}
                            </Typography>
                        ))}
                    </Box>
                    <Box sx={{
                        minWidth: 20,
                    }}>
                        = {result}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
