import React from 'react';
import {Box, Typography} from "@mui/material";
import {EColor, EFontColor} from "../../../../constant";
import {EDiagramNode} from "../../../../interface";
import {useCurrentEditElement} from "../../../../hooks";
import {PropertiesSection, VariableStatisticSection} from "./section";
import {ElementSetupToolbarStyleSection} from "./ElementSetupToolbarStyleSection";


export const ElementSetupToolbar = () => {
    const selectedElementData = useCurrentEditElement()?.data

    return (
        <Box
            sx={{
                pointerEvents: 'auto',
                borderColor: EColor.grey2,
                borderStyle: 'solid',
                borderWidth: '1px',
                px: 2,
                py: 1,
                width: 250,
                backgroundColor: EColor.white,
            }}
        >
            {selectedElementData ?
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}>
                    <Typography sx={{
                        color: EFontColor.grey4,
                    }}>
                        {selectedElementData?.type}
                    </Typography>
                    <PropertiesSection selectedElementData={selectedElementData}/>
                    <ElementSetupToolbarStyleSection element={selectedElementData}/>
                    {selectedElementData?.type === EDiagramNode.Variable && <VariableStatisticSection/>}
                </Box>
                : <Typography>
                    Please select an element to edit
                </Typography>
            }
        </Box>
    );
};
