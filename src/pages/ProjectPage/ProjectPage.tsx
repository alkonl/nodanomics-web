import React, {useEffect} from 'react';
import {
    DashboardPageLayout,
    ProjectDetails,
    ProjectsList,
    LandingScrollLayout, CreateProject
} from "../../component";
import {useAppDispatch, useProjectDashboardState, projectDashboardAction} from "../../redux";
import {MOCK_PROJECTS} from "../../mock/MOCK_PROJECT";
import moment from "moment";
import {useDidMountEffect} from "../../hooks";
import {useGetProjectsQuery} from "../../api";
import {IBaseProject} from "../../interface";

export const ProjectPage = () => {
    const dispatch = useAppDispatch()

    const {data: allProjects} = useGetProjectsQuery(undefined)

    useEffect(() => {
        if (allProjects) {
            const sortedProjects: IBaseProject[] = allProjects.map((project) => ({
                name: project.name,
                id: project.id,
                createdBy: `${project.creator.firstName} ${project.creator.lastName}`,
                lastEditedBy: `${project.lastEditor.firstName} ${project.lastEditor.lastName}`,
                createdAt: project.createdAt,
                editedAt: project.updatedAt,
            }))
            dispatch(projectDashboardAction.setProjects({
                projects: sortedProjects
            }))
        }
    }, [dispatch, allProjects])

    const projects = useProjectDashboardState().projects

    useDidMountEffect(() => {
        if (projects.length > 0) {
            const projectId = projects[0].id
            dispatch(projectDashboardAction.setSelectedProjectId({
                projectId: projectId
            }))
        }
    }, [projects])


    return (
        <DashboardPageLayout pageName="Projects">
            <LandingScrollLayout>
                <CreateProject/>
                <ProjectsList/>
            </LandingScrollLayout>
            <ProjectDetails/>
        </DashboardPageLayout>
    );
};
