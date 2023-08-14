import React from "react";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {ElementSetupToolbarSectionTitle} from "../styledComponents";

export const BaseSection: React.FC<{
    children: React.ReactNode;
    title: string;
    isOpen: boolean;
    toggle: ()=>void;
}> = ({children, title, isOpen, toggle}) => {




    return (
        <Accordion
            sx={{
                padding: 0,
                paddingRight: '2px',
                margin: 0,
                '&.MuiAccordion-root': {
                    boxShadow: 'none',
                    border: 'none',
                    padding: 0,
                    margin: 0,
                    '&:before': {
                        display: 'none',
                    },
                },
            }}
            expanded={isOpen}
        >
            <ElementSetupToolbarSectionTitle>
                <AccordionSummary
                    sx={{
                        padding: 0,
                        margin: 0,
                        minHeight: '0 !important',
                        '& .MuiAccordionSummary-content': {
                            margin: '0 !important',
                            padding: 0,
                            minHeight: 0,
                            height: 'auto',
                        },
                        '& .Mui-expanded': {
                            minHeight: '0 !important',
                            height: 'auto',
                        }
                    }}
                    onClick={toggle}
                    expandIcon={<ExpandMoreIcon/>}
                >

                    {title}
                </AccordionSummary>
            </ElementSetupToolbarSectionTitle>
            <AccordionDetails
                sx={{
                    padding: 0,
                }}>
                {children}
            </AccordionDetails>
        </Accordion>
    );
};
