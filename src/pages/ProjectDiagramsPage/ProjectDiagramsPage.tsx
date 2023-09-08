import React from 'react';
import {CreateDiagramPopUp, DashboardPageLayout, DiagramList, LandingScrollLayout} from "../../component";
import {useToggle} from "../../hooks";
import {useParams} from "react-router-dom";
import {MButton} from "../../component/base";
import {useGetProjectDiagramsQuery} from "../../api";

export const ProjectDiagramsPage = () => {

    const createDiagramPopUpManager = useToggle()
    const {projectId} = useParams<{ projectId: string }>()
    const {data: projectDiagrams} = useGetProjectDiagramsQuery({
        projectId
    }, {
        skip: !projectId
    })

    return (
        <DashboardPageLayout pageName={"Diagrams"}>
            {projectId && <CreateDiagramPopUp
                projectId={projectId}
                onClose={createDiagramPopUpManager.close}
                isShow={createDiagramPopUpManager.isOpened}
            />}
            <LandingScrollLayout>
                <MButton.Submit
                    onClick={createDiagramPopUpManager.open}
                >
                    Create Diagram
                </MButton.Submit>
                {projectDiagrams && <DiagramList diagrams={projectDiagrams.diagrams}/>}
            </LandingScrollLayout>


        </DashboardPageLayout>
    );
};
