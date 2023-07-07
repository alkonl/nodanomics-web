import React, {useEffect, useRef} from 'react';
import {
    DashboardPageLayout,
    ProjectDetails,
    ProjectsList,
    LandingScrollLayout, CreateProject
} from "../../component";
import {useAppDispatch, useProjectDashboardState, projectDashboardAction} from "../../redux";
import {useDidMountEffect, useScrollToBottom} from "../../hooks";
import {useGetProjectsQuery} from "../../api";
import {IBaseProject} from "../../interface";

export const ProjectPage = () => {
    const myDivRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch()
    const [offset, setOffset] = React.useState(0);

    const {data: allProjects} = useGetProjectsQuery({
        offset: offset,
        limit: 50,
    })
    const reachedBottom = useScrollToBottom(myDivRef)
    useEffect(() => {
        // setOffset(prevOffset => prevOffset + 50)
    }, [reachedBottom])
    useEffect(() => {
        console.log(offset)
    }, [offset])
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
            <LandingScrollLayout scrollRef={myDivRef}>
                <CreateProject/>
                <ProjectsList/>
            </LandingScrollLayout>
            <ProjectDetails/>
        </DashboardPageLayout>
    );
};
