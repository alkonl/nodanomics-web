import React from 'react';
// eslint-disable-next-line import/named
import {NodeProps, Position} from "reactflow";
import {EConnectionMode, IMicroLoopNodeData} from "../../../../interface";
import {BaseNodeContainer} from "../container/BaseNodeContainer";
import {Box} from "@mui/material";
import {EColor, EFontColor, GAP_BETWEEN_EDITOR_CANVAS_DOTS} from "../../../../constant";
import {useExpandOrCollapse} from "../../../../hooks";
import {EventHandle} from "../../CustomHandle/EventHandle";
import {LogicHandle} from "../../CustomHandle";
import {NodeStyle} from "../styledComponent";

const WIDTH = GAP_BETWEEN_EDITOR_CANVAS_DOTS * 5

export const MicroLoopNode: React.FC<NodeProps<IMicroLoopNodeData>> = (props) => {
    const {data} = props;

    const isCollapsed = data.isCollapsed
    const {expandOrCollapse} = useExpandOrCollapse({
        nodeData: data,
    })

    const changeExpandOrCollapse = () => {
        expandOrCollapse({parentId: data.id})
    }

    const onDoubleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
        console.log('onDoubleClick', event)
        if (event.detail === 2) {
            changeExpandOrCollapse()
        }

    }

    return (
        <BaseNodeContainer node={props}>
            <Box
                onClick={onDoubleClick}
                sx={{
                    boxSizing: 'border-box',
                    width: isCollapsed ? WIDTH : data.style.width,
                    height: isCollapsed ? GAP_BETWEEN_EDITOR_CANVAS_DOTS * 3 : data.style.height,
                    backgroundColor: EColor.lightPurple,
                    display: 'flex',
                    position: 'relative',
                }}
            >
                {/*Connections*/}
                <Box sx={{
                    position: 'absolute',
                    width: 'calc(100% + 30px)',
                    height: '100%',
                    left: -15,
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'none',
                    pointerEvents: 'none',
                }}>
                    <Box sx={{
                        display: 'flex',
                        flex: 1,
                        justifyContent: 'space-between',
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 0.5,
                        }}>
                            <LogicHandle
                                type="target"
                                position={Position.Left}
                                mode={EConnectionMode.NodeIncoming}
                            />
                            <EventHandle
                                type="target"
                                position={Position.Left}
                                mode={EConnectionMode.NodeIncoming}
                            />
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 0.5,
                        }}>
                            <EventHandle type="source" position={Position.Right} mode={EConnectionMode.NodeOutgoing}/>
                            <LogicHandle type="source" position={Position.Right} mode={EConnectionMode.NodeOutgoing}/>
                        </Box>
                    </Box>

                </Box>
                {/*Content*/}
                {isCollapsed && <Box
                    sx={{
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'column',
                    }}>
                    <Box sx={{
                        height: 'calc(50% + 14px)',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                    }}>
                        <NodeStyle.Name sx={{
                            color: EFontColor.white
                        }}>
                            {data.name}
                        </NodeStyle.Name>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'end',
                        paddingRight: 0.5,
                    }}>
                        <Box>
                            <NodeStyle.Name
                                type="small"
                                sx={{
                                    color: EFontColor.white,
                                    textAlign: 'end',
                                }}>
                                Loops
                            </NodeStyle.Name>
                            <NodeStyle.Name
                                type="small"
                                sx={{
                                    textAlign: 'end',
                                    fontWeight: 600,
                                    color: EFontColor.white,
                                }}>
                                {data.loopCount}
                            </NodeStyle.Name>
                        </Box>
                    </Box>
                </Box>}
                {/* inner connections*/}
                {!isCollapsed &&
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flex: 1,
                        }}
                    >
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            width: 'fit-content',
                        }}>
                            <Box sx={{
                                backgroundColor: EColor.white,
                                paddingLeft: 0.7,
                                paddingRight: 1,
                                py: 0.5,
                                borderRadius: 2,
                                gap: 1,
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}>
                                <Box sx={{
                                    flex: 1,
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <Box>
                                        <NodeStyle.Name type="small">
                                            start Trigger
                                        </NodeStyle.Name>
                                    </Box>
                                    <EventHandle type="source" position={Position.Right}
                                                 mode={EConnectionMode.LoopInnerToChildren}/>
                                </Box>
                                <Box sx={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}>
                                    <NodeStyle.Name type="small">
                                        data
                                    </NodeStyle.Name>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                        <LogicHandle type="source"
                                                     position={Position.Right}
                                                     mode={EConnectionMode.LoopInnerToChildren}/>
                                    </Box>
                                </Box>
                            </Box>

                        </Box>
                        <Box sx={{
                            backgroundColor: EColor.white,
                            paddingLeft: 0.7,
                            paddingRight: 1,
                            py: 0.5,
                            borderRadius: 2,
                            height: 'fit-content',
                        }}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                height: 'fit-content',
                            }}>
                                <LogicHandle
                                    type="target"
                                    position={Position.Left}
                                    mode={EConnectionMode.LoopChildrenToExternal}
                                />
                                <NodeStyle.Name>
                                    data to out
                                </NodeStyle.Name>

                            </Box>

                        </Box>
                    </Box>
                }
            </Box>
        </BaseNodeContainer>
    );
};
