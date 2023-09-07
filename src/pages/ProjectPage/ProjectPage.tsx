import React from 'react';
import {
    DashboardPageLayout,
    ProjectDetails,
    ProjectsList,
    LandingScrollLayout, CreateProjectButton
} from "../../component";
import {useAutoSelectFirstProject, useGetInfinityProjects} from "../../hooks";
import FormulaInput from "../../component/Test";


export const ProjectPage = () => {

    const {
        scrollRef
    } = useGetInfinityProjects()

    useAutoSelectFirstProject()


    return (
        <DashboardPageLayout pageName="Projects">
            <LandingScrollLayout scrollRef={scrollRef}>
                <FormulaInput variables={['amo', 'user.hp','clone']}/>
                <CreateProjectButton/>
                <ProjectsList/>
            </LandingScrollLayout>
            <ProjectDetails/>
        </DashboardPageLayout>
    );
};
