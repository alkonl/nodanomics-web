import React, {useMemo} from 'react';
import {Box, Input} from "@mui/material";
// eslint-disable-next-line import/named
import {Handle, NodeProps, Position} from "reactflow";
import {IFormulaNodeData} from "../../../../interface";
import {EColor, EFontColor} from "../../../../constant";

export const FormulaNode: React.FC<NodeProps<IFormulaNodeData>> = ({isConnectable, data}) => {
    const result = useMemo(() => {
        if (data.result && data.result.type === 'number') {
            return data.result.value
        }
    }, [data])
    return (
        <Box sx={{
            padding: 1,
            backgroundColor: EColor.black,
            color: EFontColor.white,
        }}>
            <Handle type="target" position={Position.Left} isConnectable={isConnectable}/>
            <Box>
                <Input sx={{
                    color: EFontColor.white,
                }}/>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <Box>
                        list of inputs
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
