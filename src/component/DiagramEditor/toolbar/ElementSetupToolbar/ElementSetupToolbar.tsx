import React from 'react';
import {Box, Typography} from "@mui/material";
import {EColor, EFontColor} from "../../../../constant";
import {EDiagramNode, EElementType} from "../../../../interface";
import {useCurrentEditElement, useUpdateElement} from "../../../../hooks";
import {PropertiesSection, VariableStatisticSection} from "./section";


export const ElementSetupToolbar = () => {
    const selectedElementData = useCurrentEditElement()?.data
    const {updateNodeData, updateEdgeData} = useUpdateElement({
        elementType: selectedElementData?.elementType,
        elementId: selectedElementData?.id,
    })

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
                <>
                    <Typography sx={{
                        color: EFontColor.grey4,
                    }}>
                        {selectedElementData?.type}
                    </Typography>
                    <PropertiesSection selectedElementData={selectedElementData}/>
                    {selectedElementData?.type === EDiagramNode.Variable && <VariableStatisticSection/>}
                </>
                : <Typography>
                    Please select an element to edit
                </Typography>
            }
        </Box>
    );
};
