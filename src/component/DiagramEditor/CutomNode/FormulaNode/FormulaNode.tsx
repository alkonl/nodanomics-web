import React, {useEffect, useMemo, useState} from 'react';
import {Box, Input, Typography} from "@mui/material";
// eslint-disable-next-line import/named
import {Handle, NodeProps, Position} from "reactflow";
import {EConnection, IFormulaNodeData} from "../../../../interface";
import {EColor, EFontColor} from "../../../../constant";
import {useUpdateNode} from "../../../../hooks";

export const FormulaNode: React.FC<NodeProps<IFormulaNodeData>> = ({isConnectable, data}) => {

    const [formula, setFormula] = useState<string>(data.formula || '')

    const result = useMemo(() => {
        if (data.result && data.result.type === 'number') {
            return data.result.value
        }
    }, [data])

    const {updateNodeData} = useUpdateNode({
        nodeId: data.id,
    })
    const onFormulaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormula(event.target.value)
    }

    useEffect(() => {
        updateNodeData({
            formula
        })
    }, [formula])

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
            <Handle
                type="source"
                position={Position.Right}
                isConnectable={isConnectable}
                id={EConnection.EventConnection}
                style={{
                    background: EColor.blue,
                }}
            />
            <Box>
                <Input
                    onChange={onFormulaChange}
                    value={formula}
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
                        <Typography>
                            list of inputs
                        </Typography>
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
