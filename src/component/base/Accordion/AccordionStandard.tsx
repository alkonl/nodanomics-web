import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useToggle} from "../../../hooks";

export const AccordionStandard: React.FC<{
    title: string,
    children: React.ReactNode
}> = ({title, children}) => {
    const toggleAccordion = useToggle({initialState: true})
    return (
        <Accordion
            expanded={toggleAccordion.isOpened}
            sx={{
                boxShadow: 'none',
                border: 'none',
                '&:before': {
                    display: 'none',
                },
            }}
        >
            <AccordionSummary
                sx={{
                    width: 'fit-content',
                    border: 'none',
                }}
                onClick={toggleAccordion.toggle}
                expandIcon={<ExpandMoreIcon/>}
            >
                <Typography>
                    {title}
                </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{
                display: 'flex',
                flexWrap: 'wrap',
                border: 'none',
                height: 'fit-content',
                gap: 3,
            }}>
                {children}
            </AccordionDetails>
        </Accordion>
    );
};
