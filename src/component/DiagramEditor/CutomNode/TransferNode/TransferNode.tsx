import React from 'react';
import {EColor, GAP_BETWEEN_EDITOR_CANVAS_DOTS} from "../../../../constant";
import {Box} from "@mui/material";
import {BaseNodeShapeContainer} from "../container";
import {NodeStyle} from "../styledComponent";
import type {NodeProps} from "reactflow";
import {EConnectionMode, ISinkNodeData} from "../../../../interface";
import {ChainHandle} from "../../CustomHandle/ChainHandle";
import {Position} from "reactflow";
import {DataHandle} from "../../CustomHandle/DataHandle";

const clipPath = 'polygon(82% 0, 100% 50%, 82% 100%, 0% 100%, 17% 50%, 0% 0%);'
const HEIGHT = GAP_BETWEEN_EDITOR_CANVAS_DOTS * 3
const WIDTH = GAP_BETWEEN_EDITOR_CANVAS_DOTS * 6


export const TransferNode: React.FC<NodeProps<ISinkNodeData>> = (props) => {
    const {data, isConnectable} = props;
    return (
        <>
            {/*connections*/}
            <Box sx={{
                position: 'absolute',
                width: 'calc(100% + 28px)',
                height: 'calc(100% + 28px)',
                left: -14,
                top: -14,
            }}>

                <Box sx={{
                    position: 'absolute',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    top: 'calc(30% - 5px)',
                }}>
                    <DataHandle
                        type="target"
                        position={Position.Left}
                        isConnectable={isConnectable}
                        mode={EConnectionMode.NodeIncoming}
                    />
                    <DataHandle
                        type="source"
                        position={Position.Right}
                        isConnectable={isConnectable}
                        mode={EConnectionMode.NodeOutgoing}
                    />

                </Box>

                <Box sx={{
                    width: '100%',
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'space-between',
                    bottom: 'calc(30% - 5px)',
                }}>
                    <ChainHandle
                        type="target"
                        position={Position.Left}
                        isConnectable={isConnectable}

                    />
                    <ChainHandle
                        type="source"
                        position={Position.Right}
                        isConnectable={isConnectable}
                        mode={EConnectionMode.NodeOutgoing}
                    />
                </Box>
            </Box>
            <BaseNodeShapeContainer
                params={{
                    width: WIDTH,
                    height: HEIGHT,
                    clipPath: clipPath,
                }}
                sxContentContainer={{
                    top: 2.5,
                    left: 2.5,
                    width: `${WIDTH - 2}px !important`,
                    marginLeft: '1px',

                }}
                node={props}
            >

                {/*content*/}
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    clipPath: clipPath,
                    background: EColor.black,
                }}>
                    {/*safe area*/}
                    <Box sx={{
                        position: 'relative',
                        marginRight: '30px',
                        marginLeft: '33px',
                        width: '100%',
                        height: '100%',
                        overflow: 'hidden',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>

                        <NodeStyle.Name sx={{
                            position: 'absolute',
                            paddingLeft: 0.5,
                            paddingRight: 0.5,
                        }}>
                            {data.name}
                        </NodeStyle.Name>
                    </Box>
                </Box>
            </BaseNodeShapeContainer>
        </>
    );
};
