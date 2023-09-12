import React from 'react';
import {CreateDiagramPopUp, DashboardPageLayout, DiagramInfo, DiagramList, LandingScrollLayout} from "../../component";
import {useAutoSelectFirstDiagram, useDiagramDashboard, useToggle} from "../../hooks";
import {MButton} from "../../component/base";
import {useDiagramDashboardState} from "../../redux";
import {useParams} from "react-router-dom";

export const ProjectDiagramsPage = () => {
    const createDiagramPopUpManager = useToggle()
    const {projectId} = useParams<{ projectId: string }>()

    const {scrollRef, clearCursor} = useDiagramDashboard()

    const {diagrams} = useDiagramDashboardState()
    useAutoSelectFirstDiagram()

    return (
        <DashboardPageLayout pageName={"Diagrams"}>
            {projectId && <CreateDiagramPopUp
                onSuccess={clearCursor}
                projectId={projectId}
                onClose={createDiagramPopUpManager.close}
                isShow={createDiagramPopUpManager.isOpened}
            />}
            <LandingScrollLayout scrollRef={scrollRef}>
                <MButton.Submit
                    onClick={createDiagramPopUpManager.open}
                >
                    Create Diagram
                </MButton.Submit>
                {diagrams && <DiagramList diagrams={diagrams}/>}
            </LandingScrollLayout>
            <DiagramInfo/>

        </DashboardPageLayout>
    );
};
