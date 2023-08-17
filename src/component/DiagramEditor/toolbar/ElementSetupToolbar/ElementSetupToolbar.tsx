import React from 'react';
import {Box, Typography} from "@mui/material";
import {EColor, EFontColor} from "../../../../constant";
import {EElementType, nodeSetupToolbarNames} from "../../../../interface";
import {useCurrentEditElement} from "../../../../hooks";
import {NodeStatisticSection, PropertiesSection} from "./section";
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
                maxWidth: 320,
                height: '100%',
                boxSizing: 'border-box',
                overflowY: 'auto',
                overflowX: 'hidden',
                backgroundColor: EColor.white,
            }}
        >
            <Box sx={{
                px: 2,
                py: 1,
            }}>
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
                                {nodeSetupToolbarNames[selectedElementData.type]}
                            </Typography>
                            <PropertiesSection selectedElementData={selectedElementData}/>

                            <StyleSection element={selectedElementData}/>
                            {selectedElementData?.elementType === EElementType.Node &&
                                <NodeStatisticSection nodeData={selectedElementData}/>}


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
        </Box>
    );
};
