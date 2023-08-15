import React, {useEffect, useState} from 'react';
// eslint-disable-next-line import/named
import {NodeProps, Position} from "reactflow";
import {EConnectionMode, IMicroLoopNodeData} from "../../../../interface";
import {BaseNodeContainer} from "../container/BaseNodeContainer";
import {Box} from "@mui/material";
import {EColor} from "../../../../constant";
import {useExpandOrCollapse, useUpdateNode, useWidthAndHeight} from "../../../../hooks";
import {EventHandle} from "../../CustomHandle/EventHandle";
import {LogicHandle} from "../../CustomHandle";
import {MicroLoopNodeHeader} from "./MicroLoopNodeHeader";
import {NodeStyle} from "../styledComponent";

export const MicroLoopNode: React.FC<NodeProps<IMicroLoopNodeData>> = (props) => {
    const {data} = props;

    const [loopCount, setLoopCount] = useState<number | undefined>(data.loopCount)
    const {updateNodeData} = useUpdateNode<IMicroLoopNodeData>({
        nodeId: data.id,
    })

    const onLoopCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoopCount(Number(event.target.value))
    }

    useEffect(() => {
        if (loopCount) {
            updateNodeData({loopCount})
        }
    }, [loopCount])

    const {isExpanded, expandOrCollapse} = useExpandOrCollapse({
        initialIsOpened: data.isCollapsed,
    })

    const changeExpandOrCollapse = () => {
        expandOrCollapse({parentId: data.id})
    }

    const loopOutText = !data.isLoopWasActive ? 'was not active' : !data.isLoopActive ? 'finished' : 'running'
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
                    width: isExpanded ? 'fit-content' : data.style.width,
                    height: isExpanded ? 'fit-content' : data.style.height,
                    backgroundColor: EColor.darkPurple,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <MicroLoopNodeHeader
                    type="big"
                    name={data.name}
                    onLoopCountChange={onLoopCountChange}
                    loopCount={loopCount}
                    currentLoopCount={data.currentLoopCount}
                    changeExpandOrCollapse={changeExpandOrCollapse}
                />
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
                            <EventHandle type="source" position={Position.Right} mode={EConnectionMode.NodeOutgoing}/>
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
                {/*<ExternalDataHandlers {...props}/>*/}
                {!isExpanded &&
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
