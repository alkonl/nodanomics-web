import React from 'react';
import {Box, Input} from "@mui/material";
import {NodeStyle} from "../styledComponent";
import {EFontColor} from "../../../../constant";
import {MButton} from "../../../base";

interface MicroLoopNodeHeaderProps {
    type: 'big' | 'small';
    name: string;
    onLoopCountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    loopCount?: number;
    currentLoopCount: number;
    changeExpandOrCollapse: () => void;
}

export const MicroLoopNodeHeader: React.FC<MicroLoopNodeHeaderProps> = (
    {
        name,
        onLoopCountChange,
        loopCount,
        currentLoopCount,
        changeExpandOrCollapse,
        type
    }
) => {
    return (
        <>
            {type === 'big' &&

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Box sx={{
                        display: 'flex',
                        gap: 3,
                    }}>


                        <NodeStyle.Name type="header">
                            {name}
                        </NodeStyle.Name>
                        <Box sx={{
                            display: 'flex',
                            gap: 1,
                            alignItems: 'flex-end',
                        }}>
                            <NodeStyle.Name>
                                total:
                            </NodeStyle.Name>
                            <Input
                                onChange={onLoopCountChange}
                                value={loopCount}
                                sx={{
                                    color: EFontColor.white,
                                    width: 40,
                                    height: 20,
                                }}/>

                        </Box>
                        <Box sx={{
                            display: 'flex',
                            gap: 1,
                            alignItems: 'flex-end',
                        }}>
                            <NodeStyle.Name>
                                current: {currentLoopCount}
                            </NodeStyle.Name>
                        </Box>
                    </Box>
                    <MButton.Submit
                        onClick={changeExpandOrCollapse}
                    >
                        collapse
                    </MButton.Submit>
                </Box>
            }
            {type === 'small' &&
                <Box>
                    <Box

                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: 0.5,
                            boxSizing: 'border-box',
                        }}
                    >
                        <NodeStyle.Name
                            onClick={changeExpandOrCollapse}
                            type="header"
                            sx={{
                                cursor: 'pointer',
                            }}
                        >
                            {name}
                        </NodeStyle.Name>
                        <Box sx={{
                            display: 'flex',
                            gap: 1,
                            alignItems: 'flex-end',
                        }}>
                            <NodeStyle.Name>
                                total:
                            </NodeStyle.Name>
                            <Input
                                onChange={onLoopCountChange}
                                value={loopCount}
                                sx={{
                                    color: EFontColor.white,
                                    width: 40,
                                    height: 20,
                                }}/>

                        </Box>
                        <Box sx={{
                            display: 'flex',
                            gap: 1,
                            alignItems: 'flex-end',
                        }}>
                            <NodeStyle.Name>
                                current: {currentLoopCount}
                            </NodeStyle.Name>
                        </Box>
                    </Box>
                </Box>
            }
        </>
    );
};
