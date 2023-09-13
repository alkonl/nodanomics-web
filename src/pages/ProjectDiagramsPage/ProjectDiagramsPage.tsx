import React from 'react';
import {CreateDiagramPopUp, DashboardPageLayout, DiagramInfo, DiagramList, LandingScrollLayout} from "../../component";
import {useAutoSelectFirstDiagram, useDiagramDashboard, useToggle} from "../../hooks";
import {MButton} from "../../component/base";
import {useDiagramDashboardState} from "../../redux";
import {useNavigate, useParams} from "react-router-dom";
import {ELinks} from "../../service";

export const ProjectDiagramsPage = () => {
    const navigate = useNavigate()
    const createDiagramPopUpManager = useToggle()
    const {projectId} = useParams<{ projectId: string }>()

    const {scrollRef} = useDiagramDashboard()

    const {diagrams} = useDiagramDashboardState()
    useAutoSelectFirstDiagram()

    const onDiagramCreated = (createdDiagram: {id: string}) => {
        navigate(`${ELinks.diagram}/${createdDiagram.id}`)
    }

    return (
        <DashboardPageLayout pageName="Diagrams">
            {projectId && <CreateDiagramPopUp
                onSuccess={onDiagramCreated}
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
