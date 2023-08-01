import React from 'react';
import {BaseNodeContainer} from "../container/BaseNodeContainer";
// eslint-disable-next-line import/named
import {NodeProps, Position} from "reactflow";
import {IWhileLoopNodeData} from "../../../../interface";
import {EColor} from "../../../../constant";
import {Box} from "@mui/material";
import {NodeText} from "../styledComponent";
import {EventHandle} from "../../CustomHandle/EventHandle";

export const WhileLoopNode: React.FC<NodeProps<IWhileLoopNodeData>> = (props) => {
    const {data} = props;

    const isActiveText = data.isLoopActive ? 'active' : 'no active'

    return (
        <BaseNodeContainer node={props}>
            <Box
                sx={{
                    padding: 1,
                    boxSizing: 'border-box',
                    width: data.style.width,
                    height: data.style.height,
                    backgroundColor: EColor.darkPurple,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box sx={{
                    display: 'flex',
                    gap: 3,
                    alignItems: 'flex-end',
                }}>

                    <NodeText.Name type="header">
                        {data.name}
                    </NodeText.Name>
                </Box>
                <Box sx={{
                    position: 'relative',
                    backgroundColor: EColor.white,
                    paddingLeft: 1,
                    paddingRight: 0.7,
                    py: 0.5,
                    borderRadius: 4,
                    width: 'fit-content',
                }}>
                    <EventHandle type="target" position={Position.Left}/>
                    <NodeText.Name >
                        {isActiveText}
                    </NodeText.Name>
                </Box>
            </Box>
        </BaseNodeContainer>
    );
};
