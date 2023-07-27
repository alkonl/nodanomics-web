import React from 'react';
import {Box, Typography} from "@mui/material";
import {EColor, EFontColor} from "../../../../constant";
import {EDiagramNode, EElementType} from "../../../../interface";
import {useCurrentEditElement} from "../../../../hooks";
import {PropertiesSection, VariableStatisticSection} from "./section";
import {StyleSection} from "./section/StyleSection";
import {NodeDeleteButton} from "./NodeDeleteButton";


export const ElementSetupToolbar = () => {
    const selectedElementData = useCurrentEditElement()?.data

    return (
        <Box
            sx={{
                display: 'flex',
                pointerEvents: 'auto',
                borderColor: EColor.grey2,
                borderStyle: 'solid',
                borderWidth: '1px',
                px: 2,
                py: 1,
                width: 270,
                backgroundColor: EColor.white,
            }}
        >
            {selectedElementData ?
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        flex: 1,
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}>
                        <Typography sx={{
                            color: EFontColor.grey4,
                        }}>
                            {selectedElementData.type}
                        </Typography>
                        <PropertiesSection selectedElementData={selectedElementData}/>
                        <StyleSection element={selectedElementData}/>
                        {selectedElementData?.type === EDiagramNode.Variable && <VariableStatisticSection/>}

                    </Box>
                    {selectedElementData.elementType === EElementType.Node && <Box
                        sx={{
                            mt: 2,
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <NodeDeleteButton nodeId={selectedElementData.id}/>
                    </Box>}
                </Box>
                : <Typography>
                    Please select an element to edit
                </Typography>
            }
        </Box>
    );
};
