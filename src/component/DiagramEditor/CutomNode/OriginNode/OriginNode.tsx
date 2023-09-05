import React from 'react';
import {Box} from "@mui/material";
// eslint-disable-next-line import/named
import {NodeProps, Position} from "reactflow";
import {IOriginNodeData} from "../../../../interface";
import {NodeStyle} from "../styledComponent";
import {EColor, GAP_BETWEEN_EDITOR_CANVAS_DOTS} from "../../../../constant";
import {BaseNodeShapeContainer} from "../container";
import {ChainHandle} from "../../CustomHandle/ChainHandle";
import {DataHandle} from "../../CustomHandle/DataHandle";

const SIZE = GAP_BETWEEN_EDITOR_CANVAS_DOTS * 4
const clipPath = 'polygon(50% 0%, 100% 50%, 100% 100%, 0 100%, 0 50%)'

export const OriginNode: React.FC<NodeProps<IOriginNodeData>> = (props) => {
    const {isConnectable, data} = props



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
                    width: '100%',
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'space-between',
                    bottom: 40,
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
                    />
                </Box>
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 'calc(50% - 5px)',
                }}>
                    <DataHandle
                        type="source"
                        position={Position.Top}
                        isConnectable={isConnectable}
                    />
                </Box>
            </Box>
            <BaseNodeShapeContainer
                params={{
                    width: SIZE,
                    height: SIZE,
                    clipPath: clipPath,
                }}
                node={props}>

                {/*content*/}
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    clipPath: clipPath,
                    background: EColor.black,
                }}>
                    <NodeStyle.Name sx={{
                        position: 'absolute',
                        top: GAP_BETWEEN_EDITOR_CANVAS_DOTS * 2.5,
                        paddingLeft: 0.5,
                        paddingRight: 0.5,
                    }}>
                        {data.name}
                    </NodeStyle.Name>
                </Box>
            </BaseNodeShapeContainer>


        </>
    );
};
