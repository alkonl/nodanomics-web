import React from 'react';
import {LoopContainer} from "../container";
// eslint-disable-next-line import/named
import {NodeProps, Position} from "reactflow";
import {EConnectionMode, IWhileLoopNodeData} from "../../../../interface";
import {EColor, EFontColor, GAP_BETWEEN_EDITOR_CANVAS_DOTS} from "../../../../constant";
import {Box} from "@mui/material";
import {NodeStyle} from "../styledComponent";
import {ChainHandle} from "../../CustomHandle/ChainHandle";
import {useExpandOrCollapse} from "../../../../hooks";
import {LogicHandle} from "../../CustomHandle";

const WIDTH = GAP_BETWEEN_EDITOR_CANVAS_DOTS * 5
const HEIGHT = GAP_BETWEEN_EDITOR_CANVAS_DOTS * 3

export const WhileLoopNode: React.FC<NodeProps<IWhileLoopNodeData>> = (props) => {
    const {data} = props;

    const isCollapsed = data.isCollapsed
    const {expandOrCollapse} = useExpandOrCollapse({
        nodeData: data,
    })

    const changeExpandOrCollapse = () => {
        expandOrCollapse()
    }

    const onDoubleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
        if (event.detail === 2) {
            changeExpandOrCollapse()
        }
    }


    // const isActiveText = data.isLoopActive ? 'active' : 'no active'
    // const loopOutText = !data.isLoopWasActive ? 'was not active' : !data.isLoopActive ? 'finished' : 'running'
    //
    // const {expandOrCollapse} = useExpandOrCollapse({
    //     nodeData: data,
    // })
    //
    // const isCollapsed = data.isCollapsed
    // const changeExpandOrCollapse = () => {
    //     expandOrCollapse()
    // }
    //
    // const {
    //     elementSize: externalConnectionContainerSize,
    //     elementRef: externalConnectionContainerRef
    // } = useWidthAndHeight()

    return (
        <LoopContainer node={props}>
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
                        <ChainHandle
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
                        <ChainHandle type="source" position={Position.Right} mode={EConnectionMode.NodeOutgoing}/>
                        <LogicHandle type="source" position={Position.Right} mode={EConnectionMode.NodeOutgoing}/>
                    </Box>
                </Box>
            </Box>

            <Box
                sx={{
                    padding: 1,
                    boxSizing: 'border-box',
                    width: isCollapsed ? WIDTH : data.style.width,
                    height: isCollapsed ? HEIGHT : data.style.height,
                    backgroundColor: EColor.lightMarine,
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'width 0.3s ease-out, height 0.3s ease-out',
                }}
                onClick={onDoubleClick}
            >
                {isCollapsed && <Box
                    sx={{
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'column',
                    }}>
                    <Box sx={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <NodeStyle.Name sx={{
                            color: EFontColor.white
                        }}>
                            {data.name}
                        </NodeStyle.Name>
                    </Box>
                </Box>}
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
                                    <ChainHandle type="source" position={Position.Right}
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
                                gap: 1,
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
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                height: 'fit-content',
                                gap: 0.5,
                            }}>
                                <ChainHandle
                                    type="target"
                                    position={Position.Left}
                                    mode={EConnectionMode.LoopChildrenToExternal}
                                />
                                <NodeStyle.Name>
                                    end
                                </NodeStyle.Name>

                            </Box>
                        </Box>
                    </Box>
                }
                {/*<Box sx={{*/}
                {/*    display: 'flex',*/}
                {/*    gap: 3,*/}
                {/*    justifyContent: 'space-between',*/}
                {/*}}>*/}

                {/*    <NodeStyle.Name type="header">*/}
                {/*        {data.name}*/}
                {/*    </NodeStyle.Name>*/}

                {/*</Box>*/}
                {/* external data handlers */}
                {/*<Box*/}

                {/*    sx={{*/}
                {/*        display: 'flex',*/}
                {/*        height: externalConnectionContainerSize.height,*/}
                {/*    }}>*/}
                {/*    <Box*/}
                {/*        ref={externalConnectionContainerRef}*/}
                {/*        sx={{*/}
                {/*            position: 'absolute',*/}
                {/*            left: -14,*/}
                {/*            height: 'fit-content',*/}
                {/*            width: 'calc(100% + 14px)',*/}
                {/*            display: 'flex',*/}
                {/*            alignItems: 'space-between',*/}
                {/*            borderRadius: 4,*/}
                {/*            boxSizing: 'border-box'*/}
                {/*        }}>*/}
                {/*        <Box sx={{*/}
                {/*            my: 0.3,*/}
                {/*            marginRight: 0.5,*/}
                {/*            marginLeft: 0.5,*/}
                {/*            display: 'flex',*/}
                {/*            flex: 1,*/}
                {/*            gap: 1,*/}
                {/*            flexDirection: 'column',*/}
                {/*            justifyContent: 'space-between',*/}
                {/*            alignItems: 'flex-start',*/}
                {/*        }}>*/}
                {/*            <Box sx={{*/}
                {/*                position: 'relative',*/}
                {/*                backgroundColor: EColor.white,*/}
                {/*                display: 'flex',*/}
                {/*                alignItems: 'center',*/}
                {/*                gap: 1,*/}
                {/*                padding: 0.5,*/}
                {/*                borderRadius: 4,*/}
                {/*                width: 'fit-content',*/}
                {/*            }}>*/}
                {/*                <LogicHandle*/}
                {/*                    type="target"*/}
                {/*                    position={Position.Left}*/}
                {/*                    mode={EConnectionMode.NodeIncoming}*/}
                {/*                />*/}
                {/*                <NodeStyle.Name>*/}
                {/*                    data*/}
                {/*                </NodeStyle.Name>*/}
                {/*            </Box>*/}


                {/*            <Box sx={{*/}
                {/*                position: 'relative',*/}
                {/*                backgroundColor: EColor.white,*/}
                {/*                display: 'flex',*/}
                {/*                alignItems: 'center',*/}
                {/*                gap: 1,*/}
                {/*                padding: 0.5,*/}
                {/*                borderRadius: 4,*/}
                {/*                width: 'fit-content',*/}
                {/*            }}>*/}
                {/*                <ChainHandle type="target" position={Position.Left}*/}
                {/*                             mode={EConnectionMode.NodeIncoming}/>*/}
                {/*                <NodeStyle.Name>*/}
                {/*                    {isActiveText}*/}
                {/*                </NodeStyle.Name>*/}
                {/*            </Box>*/}
                {/*        </Box>*/}

                {/*    </Box>*/}
                {/*    <Box sx={{*/}
                {/*        position: 'absolute',*/}
                {/*        right: -14,*/}
                {/*        display: 'flex',*/}
                {/*        flexDirection: 'column',*/}
                {/*        alignItems: 'flex-end',*/}
                {/*        gap: 1,*/}
                {/*    }}>*/}
                {/*        <Box sx={{*/}
                {/*            backgroundColor: EColor.white,*/}
                {/*            padding: 0.5,*/}
                {/*            borderRadius: 4,*/}
                {/*            width: 'fit-content',*/}
                {/*            display: 'flex',*/}
                {/*            alignItems: 'center',*/}
                {/*        }}>*/}
                {/*            <Box>*/}
                {/*                <NodeStyle.Name>*/}
                {/*                    {loopOutText}*/}
                {/*                </NodeStyle.Name>*/}
                {/*            </Box>*/}
                {/*            <ChainHandle type="source" position={Position.Right} mode={EConnectionMode.NodeOutgoing}/>*/}
                {/*        </Box>*/}
                {/*        <Box sx={{*/}
                {/*            backgroundColor: EColor.white,*/}
                {/*            padding: 0.5,*/}
                {/*            borderRadius: 4,*/}
                {/*            width: 'fit-content',*/}
                {/*            display: 'flex',*/}
                {/*            alignItems: 'center',*/}
                {/*        }}>*/}
                {/*            <Box>*/}
                {/*                <NodeStyle.Name>*/}
                {/*                    out data*/}
                {/*                </NodeStyle.Name>*/}
                {/*            </Box>*/}
                {/*            <LogicHandle type="source" position={Position.Right} mode={EConnectionMode.NodeOutgoing}/>*/}
                {/*        </Box>*/}
                {/*    </Box>*/}
                {/*</Box>*/}
                {/*{!isCollapsed &&*/}
                {/*    <Box*/}
                {/*        sx={{*/}
                {/*            display: 'flex',*/}
                {/*            justifyContent: 'space-between',*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        <Box sx={{*/}
                {/*            display: 'flex',*/}
                {/*            flexDirection: 'column',*/}
                {/*            justifyContent: 'center',*/}
                {/*            width: 'fit-content',*/}
                {/*        }}>*/}
                {/*            <Box sx={{*/}
                {/*                backgroundColor: EColor.white,*/}
                {/*                paddingLeft: 0.7,*/}
                {/*                paddingRight: 1,*/}
                {/*                py: 0.5,*/}
                {/*                borderRadius: 2,*/}
                {/*                gap: 1,*/}
                {/*                position: 'relative',*/}
                {/*                display: 'flex',*/}
                {/*                flexDirection: 'column',*/}
                {/*                alignItems: 'center',*/}
                {/*            }}>*/}
                {/*                <Box sx={{*/}
                {/*                    flex: 1,*/}
                {/*                    display: 'flex',*/}
                {/*                    alignItems: 'center'*/}
                {/*                }}>*/}
                {/*                    <Box>*/}
                {/*                        <NodeStyle.Name type="small">*/}
                {/*                            start Trigger*/}
                {/*                        </NodeStyle.Name>*/}
                {/*                    </Box>*/}
                {/*                    <ChainHandle type="source" position={Position.Right}*/}
                {/*                                 mode={EConnectionMode.LoopInnerToChildren}/>*/}
                {/*                </Box>*/}
                {/*                <Box sx={{*/}
                {/*                    width: '100%',*/}
                {/*                    display: 'flex',*/}
                {/*                    justifyContent: 'space-between',*/}
                {/*                }}>*/}
                {/*                    <NodeStyle.Name type="small">*/}
                {/*                        data*/}
                {/*                    </NodeStyle.Name>*/}
                {/*                    <Box sx={{*/}
                {/*                        display: 'flex',*/}
                {/*                        flexDirection: 'column'*/}
                {/*                    }}>*/}
                {/*                        <LogicHandle type="source" position={Position.Right}*/}
                {/*                                     mode={EConnectionMode.LoopInnerToChildren}/>*/}
                {/*                    </Box>*/}
                {/*                </Box>*/}
                {/*            </Box>*/}

                {/*        </Box>*/}
                {/*        <Box sx={{*/}
                {/*            backgroundColor: EColor.white,*/}
                {/*            paddingLeft: 0.7,*/}
                {/*            paddingRight: 1,*/}
                {/*            py: 0.5,*/}
                {/*            borderRadius: 2,*/}
                {/*            height: 'fit-content',*/}
                {/*        }}>*/}
                {/*            <Box sx={{*/}
                {/*                display: 'flex',*/}
                {/*                alignItems: 'center',*/}
                {/*                height: 'fit-content',*/}
                {/*            }}>*/}
                {/*                <LogicHandle*/}
                {/*                    type="target"*/}
                {/*                    position={Position.Left}*/}
                {/*                    mode={EConnectionMode.LoopChildrenToExternal}*/}
                {/*                />*/}
                {/*                <NodeStyle.Name>*/}
                {/*                    data to out1*/}
                {/*                </NodeStyle.Name>*/}

                {/*            </Box>*/}

                {/*        </Box>*/}
                {/*    </Box>*/}
                {/*}*/}
            </Box>
        </LoopContainer>
    );
};
