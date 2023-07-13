import React, {useState} from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const BaseSectionDeprecated: React.FC<{
    children: React.ReactNode;
    title: string;
}> = ({children, title}) => {
    const [expanded, setExpanded] = useState<boolean>(true);

    return (
        <Accordion expanded={expanded}>
            <AccordionSummary
                onClick={() => setExpanded(!expanded)}
                expandIcon={<ExpandMoreIcon/>}
            >
                <Typography>
                    {title}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                {children}
            </AccordionDetails>
        </Accordion>
    );
};
