import React from 'react';
import {Box} from "@mui/material";
import {ProjectListAccordion} from "./ProjectListAccordion";
import {useGroupProjectsByGroup} from "../../../hooks/useGroupProjectsByGroup";


export const ProjectsList = () => {

    const groupedProjects = useGroupProjectsByGroup()

    return (
        <Box>
            {groupedProjects.map(({group, items}) => (
                <ProjectListAccordion key={group.name} projectDateGroup={group.name} projects={items}/>
            ))}
        </Box>
    );
};
