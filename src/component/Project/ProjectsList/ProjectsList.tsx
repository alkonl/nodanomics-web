import React, {useMemo} from 'react';
import {Box} from "@mui/material";
import moment from "moment";
import {EProjectDateGroup, IGroupedProjects} from "../../../interface";
import {ProjectListAccordion} from "./ProjectListAccordion";
import {addToGroup} from "../../../utils";
import {useProjectDashboardState} from "../../../redux";


export const ProjectsList = () => {




    const {projects} = useProjectDashboardState()

    const formattedProjects: IGroupedProjects = useMemo(() => {
        return projects.reduce((acc: IGroupedProjects, project) => {
            const createdAt = moment(project.createdAt)
            const now = moment.now()
            const differenceInDays = Math.abs(createdAt.diff(now, 'days'))
            if (differenceInDays === 0) {
                addToGroup({allGroups: acc, project, addTo: EProjectDateGroup.DAY})
            } else if (differenceInDays < 7) {
                addToGroup({allGroups: acc, project, addTo: EProjectDateGroup.WEEK})
            } else if (differenceInDays < 30) {
                addToGroup({allGroups: acc, project, addTo: EProjectDateGroup.MONTH})
            } else if (differenceInDays < 365) {
                addToGroup({allGroups: acc, project, addTo: EProjectDateGroup.YEAR})
            } else {
                addToGroup({allGroups: acc, project, addTo: EProjectDateGroup.OLDER})
            }
            return acc
        }, []).sort((a, b) => a.group.value - b.group.value)
    }, [projects])

    return (
        <Box>
            {formattedProjects.map(({group, projects}) => (
                <ProjectListAccordion key={group.name} projectDateGroup={group.name} projects={projects}/>
            ))}
        </Box>
    );
};
