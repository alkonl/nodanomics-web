import React from 'react';
import {Box} from "@mui/material";
import {Node, NodeProps, useStore} from 'reactflow';
import {IVariableNodeData} from "../../../../interface";

export const VariableNode: React.FC<NodeProps<IVariableNodeData>> = ({data, id}) => {
    const store = useStore(state => state.setNodes())
    console.log(store)
    console.log(data)
    return (
        <Box sx={{
            width: '30px',
            height: '30px',
            backgroundColor: 'red',
        }}>
            VariableNode {data.value}
        </Box>
    );
};
