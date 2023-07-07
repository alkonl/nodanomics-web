import React, {useState} from 'react';
import {EProjectDateGroup, IBaseProject} from "../../../interface";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {ProjectsListElement} from "./ProjectsListElement";

const projectDateGroupTitle: {
    [key in EProjectDateGroup]: string
} = {
    [EProjectDateGroup.DAY]: 'Today',
    [EProjectDateGroup.WEEK]: 'Last Week',
    [EProjectDateGroup.MONTH]: 'Last Month',
    [EProjectDateGroup.YEAR]: 'Last Year',
    [EProjectDateGroup.OLDER]: 'Older',
}


export const ProjectListAccordion: React.FC<{
    projectDateGroup: EProjectDateGroup,
    projects: IBaseProject[]
}> = ({projectDateGroup, projects}) => {
    const [isProjectListAccordionOpen, setIsProjectListAccordionOpen] = useState(true)

    return (
        <Accordion
            expanded={isProjectListAccordionOpen}
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
                onClick={() => setIsProjectListAccordionOpen(!isProjectListAccordionOpen)}
                expandIcon={<ExpandMoreIcon/>}
            >
                <Typography>
                    {projectDateGroupTitle[projectDateGroup]}
                </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{
                display: 'flex',
                flexWrap: 'wrap',
                border: 'none',
                height: 'fit-content',
                gap: 3,
            }}>
                {projects.map((project) => (
                    <ProjectsListElement
                        projectName={project.name}
                        projectId={project.id}
                        key={project.id}
                        isBig={projectDateGroup === EProjectDateGroup.DAY}
                    />
                ))}
            </AccordionDetails>
        </Accordion>
    );
};
