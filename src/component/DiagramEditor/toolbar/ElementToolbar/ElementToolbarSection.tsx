import React from "react";
import {IDiagramElementPreviewToolbarElement} from "../../../../interface";
import {Box, Typography} from "@mui/material";
import {EColor} from "../../../../constant";
import {ElementToolbarElement} from "./ElementToolbarElement";

export const ElementToolbarSection: React.FC<{
    section: {
        name: string;
        elements: IDiagramElementPreviewToolbarElement[];
    }
}> = ({section}) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: EColor.grey2,
            borderStyle: 'solid',
            borderWidth: '1px',
            px: 2,
            py: 1,
        }}>
            <Typography sx={{
                fontSize: '12px',
                fontWeight: 'bold',
                color: EColor.white,
            }}>
                {section.name}
            </Typography>
            <Box sx={{
                display: 'flex',
                gap: 1,
            }}>
                {section.elements.map((element) => {
                    return (
                        <ElementToolbarElement
                            key={element.type}
                            element={element}
                        />
                    )
                })}
            </Box>
        </Box>
    )
};
