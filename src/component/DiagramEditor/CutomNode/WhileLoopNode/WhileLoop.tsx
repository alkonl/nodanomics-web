import React from 'react';
import {BaseNodeContainer} from "../container/BaseNodeContainer";
// eslint-disable-next-line import/named
import {NodeProps, Position} from "reactflow";
import {EConnectionMode, IWhileLoopNodeData} from "../../../../interface";
import {EColor} from "../../../../constant";
import {Box} from "@mui/material";
import {NodeText} from "../styledComponent";
import {EventHandle} from "../../CustomHandle/EventHandle";
import {useExpandOrCollapse} from "../../../../hooks";
import {MButton} from "../../../base";

export const WhileLoopNode: React.FC<NodeProps<IWhileLoopNodeData>> = (props) => {
    const {data} = props;

    const isActiveText = data.isLoopActive ? 'active' : 'no active'
    const loopOutText = !data.isLoopWasActive ? 'was not active' : !data.isLoopActive ? 'finished' : 'running'

    const {isExpanded, expandOrCollapse} = useExpandOrCollapse({
        initialIsOpened: data.isCollapsed,
    })

    const changeExpandOrCollapse = () => {
        expandOrCollapse({parentId: data.id})
    }

    return (
        <BaseNodeContainer node={props}>
            <Box
                sx={{
                    padding: 1,
                    boxSizing: 'border-box',
                    width: isExpanded ? 'fit-content' : data.style.width,
                    height: isExpanded ? 'fit-content' : data.style.height,
                    backgroundColor: EColor.darkGreen,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                }}
            >
                <Box sx={{
                    display: 'flex',
                    gap: 3,
                    justifyContent: 'space-between',
                }}>

                    <NodeText.Name type="header">
                        {data.name}
                    </NodeText.Name>
                    <MButton.Submit
                        onClick={changeExpandOrCollapse}
                    >
                        collapse
                    </MButton.Submit>
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    height: isExpanded ? 'fit-content' : 100,
                    alignItems: 'flex-end',
                }}>
                    <Box sx={{
                        position: 'relative',
                        backgroundColor: EColor.white,
                        paddingLeft: 1,
                        paddingRight: 0.7,
                        py: 0.5,
                        borderRadius: 4,
                        width: 'fit-content',
                    }}>
                        <EventHandle type="target" position={Position.Left} mode={EConnectionMode.LoopIn}/>
                        <NodeText.Name>
                            {isActiveText}
                        </NodeText.Name>
                    </Box>
                    <Box sx={{
                        position: 'relative',
                        backgroundColor: EColor.white,
                        paddingLeft: 0.7,
                        paddingRight: 1,
                        py: 0.5,
                        borderRadius: 4,
                        width: 'fit-content',
                    }}>
                        <NodeText.Name>
                            out state
                        </NodeText.Name>
                        <NodeText.Name>
                           {loopOutText}
                        </NodeText.Name>
                        <EventHandle type="source" position={Position.Right} mode={EConnectionMode.LoopOut}/>
                    </Box>
                </Box>


                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: 'fit-content',
                }}>
                    {isExpanded && <Box sx={{
                        backgroundColor: EColor.white,
                        paddingLeft: 0.7,
                        paddingRight: 1,
                        py: 0.5,
                        borderRadius: 2,
                        position: 'relative',
                    }}>
                        <EventHandle type="source" position={Position.Right} mode={EConnectionMode.LoopInToChildren}/>
                        <NodeText.Name type="small">
                            Loop
                        </NodeText.Name>
                        <NodeText.Name type="small">
                            Trigger
                        </NodeText.Name>
                    </Box>}

                </Box>
            </Box>
        </BaseNodeContainer>
    );
};
