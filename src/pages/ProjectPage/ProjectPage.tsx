import React, {useEffect} from 'react';
import {
    DashboardPageLayout,
    ProjectDetails,
    ProjectsList,
    LandingScrollLayout
} from "../../component";
import {useAppDispatch, useProjectDashboardState, projectDashboardAction} from "../../redux";
import {MOCK_PROJECTS} from "../../mock/MOCK_PROJECT";
import moment from "moment";
import {useDidMountEffect} from "../../hooks";

export const ProjectPage = () => {
    const dispatch = useAppDispatch()


    useEffect(() => {
        const sortedProjects = [...MOCK_PROJECTS].sort((a, b) => {
            return moment(a.createdAt).diff(b.createdAt);
        })
        dispatch(projectDashboardAction.setProjects({
            projects: sortedProjects
        }))
    }, [dispatch])

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
                <ProjectsList/>
            </LandingScrollLayout>
            <ProjectDetails/>
        </DashboardPageLayout>
    );
};
