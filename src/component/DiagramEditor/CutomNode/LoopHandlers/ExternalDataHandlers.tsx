import React from 'react';
import {Box} from "@mui/material";
import {EColor} from "../../../../constant";
import {LogicHandle} from "../../CustomHandle";
// eslint-disable-next-line import/named
import {NodeProps, Position} from "reactflow";
import {EConnectionMode, ILoopNodeData} from "../../../../interface";
import {NodeStyle} from "../styledComponent";
import {ChainHandle} from "../../CustomHandle/ChainHandle";
import {useWidthAndHeight} from "../../../../hooks";

export const ExternalDataHandlers: React.FC<NodeProps<ILoopNodeData>> = ({data}) => {
    const isActiveText = data.isLoopActive ? 'active' : 'no active'
    const loopOutText = !data.isLoopWasActive ? 'was not active' : !data.isLoopActive ? 'finished' : 'running'
    const {
        elementSize: externalConnectionContainerSize,
        elementRef: externalConnectionContainerRef
    } = useWidthAndHeight()
    return (
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
                                     mode={EConnectionMode.LoopInnerToChildren}/>
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
    );
};
