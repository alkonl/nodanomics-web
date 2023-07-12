import React, {useMemo} from 'react';
import {Box} from "@mui/material";
// eslint-disable-next-line import/named
import {Handle, NodeProps, Position} from "reactflow";
import {IFormulaNodeData} from "../../../../interface";

export const FormulaNode: React.FC<NodeProps<IFormulaNodeData>> = ({isConnectable, data}) => {
    const result = useMemo(()=>{
        console.log('FormulaNode.data: ', data)
        if(data.result && data.result.type === 'number'){
            return data.result.value
        }
    },[data])
    return (
        <Box sx={{
            padding: 1,
        }}>
            <Handle type="target" position={Position.Top} isConnectable={isConnectable}/>

            FormulaNode
            result: {result}
        </Box>
    );
};
