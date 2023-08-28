import React from 'react';
import {Box, Typography} from "@mui/material";
import {useSetupExecutionGraph} from "../../../../hooks";
import {ColorPicker} from "../../../ColorPicker";
import {EColor} from "../../../../constant";

export const ExecutionGraphSetup = () => {
    const {changeGridColor} = useSetupExecutionGraph();
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
        }}>
            <Box>
                <Typography sx={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                }}>
                    Grid setup
                </Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'flex-end',
            }}>
                <Typography>
                    Grid color
                </Typography>
                <Box sx={{
                    width: 100
                }}>
                    <ColorPicker
                        onChange={changeGridColor}
                        value={EColor.white}
                    />
                </Box>

            </Box>
            <ColorPicker
                onChange={changeGridColor}
                value={EColor.white}
            />
        </Box>
    );
};
