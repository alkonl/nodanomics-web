import React from 'react';
import {EColor, GAP_BETWEEN_EDITOR_CANVAS_DOTS} from "../../../../constant";
import {Box} from "@mui/material";
import {BaseNodeShapeContainer} from "../container";
import {NodeStyle} from "../styledComponent";
import type {NodeProps} from "reactflow";
import {ISinkNodeData} from "../../../../interface";

const clipPath = 'polygon(82% 0, 100% 50%, 82% 100%, 0% 100%, 17% 50%, 0% 0%);'
const HEIGHT = GAP_BETWEEN_EDITOR_CANVAS_DOTS * 3
const WIDTH = GAP_BETWEEN_EDITOR_CANVAS_DOTS * 6


export const TransferNode: React.FC<NodeProps<ISinkNodeData>> = (props) => {
    const {data} = props;
    return (
        <>
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
