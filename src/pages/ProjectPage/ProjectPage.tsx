import React from 'react';
import {
    DashboardPageLayout,
    ProjectDetails,
    ProjectsList,
    LandingScrollLayout, CreateProject
} from "../../component";
import {useAutoSelectFirstProject, useGetInfinityProjects} from "../../hooks";


export const ProjectPage = () => {

    const {
        scrollRef
    } = useGetInfinityProjects()

    useAutoSelectFirstProject()


    return (
        <DashboardPageLayout pageName="Projects">
            <LandingScrollLayout scrollRef={scrollRef}>
                <CreateProject/>
                <ProjectsList/>
            </LandingScrollLayout>
            <ProjectDetails/>
        </DashboardPageLayout>
    );
};
