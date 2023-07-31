import React from 'react';
// eslint-disable-next-line import/named
import {NodeProps} from "reactflow";
import {IMicroLoopNodeData} from "../../../../interface";
import {BaseNodeContainer} from "../container/BaseNodeContainer";
import {Box} from "@mui/material";
import {NodeText} from "../styledComponent";
import {EColor} from "../../../../constant";

export const MicroLoopNode: React.FC<NodeProps<IMicroLoopNodeData>> = (props) => {
    const {data} = props;
    return (
        <BaseNodeContainer node={props}>
            <Box
                sx={{
                    padding: 1,
                    boxSizing: 'border-box',
                    width: data.style.width,
                    height: data.style.height,
                    backgroundColor: EColor.darkPurple,
                }}
            >
                <NodeText.Name type="header" >
                    Micro Loop
                </NodeText.Name>
            </Box>
        </BaseNodeContainer>
    );
};
