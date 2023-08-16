import React from 'react';
import {BaseNodeContainer} from "../container";
// eslint-disable-next-line import/named
import {NodeProps, Position} from "reactflow";
import {EConnectionMode, IWhileLoopNodeData} from "../../../../interface";
import {EColor} from "../../../../constant";
import {Box} from "@mui/material";
import {NodeStyle} from "../styledComponent";
import {ChainHandle} from "../../CustomHandle/ChainHandle";
import {useExpandOrCollapse, useWidthAndHeight} from "../../../../hooks";
import {MButton} from "../../../base";
import {LogicHandle} from "../../CustomHandle";

export const WhileLoopNode: React.FC<NodeProps<IWhileLoopNodeData>> = (props) => {
    const {data} = props;

    const isActiveText = data.isLoopActive ? 'active' : 'no active'
    const loopOutText = !data.isLoopWasActive ? 'was not active' : !data.isLoopActive ? 'finished' : 'running'

    const {expandOrCollapse} = useExpandOrCollapse({
        nodeData: data,
    })

    const isCollapsed = data.isCollapsed
    const changeExpandOrCollapse = () => {
        console.log('changeExpandOrCollapse.data', data)
        expandOrCollapse({parentId: data.id})
    }

    const {
        elementSize: externalConnectionContainerSize,
        elementRef: externalConnectionContainerRef
    } = useWidthAndHeight()

    return (
        <BaseNodeContainer node={props}>
            <Box
                sx={{
                    padding: 1,
                    boxSizing: 'border-box',
                    width: isCollapsed ? 'fit-content' : data.style.width,
                    height: isCollapsed ? 'fit-content' : data.style.height,
                    backgroundColor: EColor.lightMarine,
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

                    <NodeStyle.Name type="header">
                        {data.name}
                    </NodeStyle.Name>
                    <MButton.Submit
                        onClick={changeExpandOrCollapse}
                    >
                        collapse
                    </MButton.Submit>
                </Box>
                {/* external data handlers */}
                <Box

                    sx={{
                        display: 'flex',
                        height: externalConnectionContainerSize.height,
                    }}>
                    <Box
                        ref={externalConnectionContainerRef}
                        sx={{
                            position: 'absolute',
                            left: -14,
                            height: 'fit-content',
                            width: 'calc(100% + 14px)',
                            display: 'flex',
                            alignItems: 'space-between',
                            borderRadius: 4,
                            boxSizing: 'border-box'
                        }}>
                        <Box sx={{
                            my: 0.3,
                            marginRight: 0.5,
                            marginLeft: 0.5,
                            display: 'flex',
                            flex: 1,
                            gap: 1,
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                        }}>
                            <Box sx={{
                                position: 'relative',
                                backgroundColor: EColor.white,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                padding: 0.5,
                                borderRadius: 4,
                                width: 'fit-content',
                            }}>
                                <LogicHandle
                                    type="target"
                                    position={Position.Left}
                                    mode={EConnectionMode.NodeIncoming}
                                />
                                <NodeStyle.Name>
                                    data
                                </NodeStyle.Name>
                            </Box>


                            <Box sx={{
                                position: 'relative',
                                backgroundColor: EColor.white,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                padding: 0.5,
                                borderRadius: 4,
                                width: 'fit-content',
                            }}>
                                <ChainHandle type="target" position={Position.Left}
                                             mode={EConnectionMode.WhileLoopIncomingTrigger}/>
                                <NodeStyle.Name>
                                    {isActiveText}
                                </NodeStyle.Name>
                            </Box>
                        </Box>

                    </Box>
                    <Box sx={{
                        position: 'absolute',
                        right: -14,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        gap: 1,
                    }}>
                        <Box sx={{
                            backgroundColor: EColor.white,
                            padding: 0.5,
                            borderRadius: 4,
                            width: 'fit-content',
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <Box>
                                <NodeStyle.Name>
                                    {loopOutText}
                                </NodeStyle.Name>
                            </Box>
                            <ChainHandle type="source" position={Position.Right} mode={EConnectionMode.NodeOutgoing}/>
                        </Box>
                        <Box sx={{
                            backgroundColor: EColor.white,
                            padding: 0.5,
                            borderRadius: 4,
                            width: 'fit-content',
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <Box>
                                <NodeStyle.Name>
                                    out data
                                </NodeStyle.Name>
                            </Box>
                            <LogicHandle type="source" position={Position.Right} mode={EConnectionMode.NodeOutgoing}/>
                        </Box>
                    </Box>
                </Box>
                {!isCollapsed &&
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
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
                                        <LogicHandle type="source" position={Position.Right}
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
                                    data to out1
                                </NodeStyle.Name>

                            </Box>

                        </Box>
                    </Box>
                }
            </Box>
        </BaseNodeContainer>
    );
};
