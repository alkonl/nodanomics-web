import React, {useEffect} from 'react';
import {CreateDiagramPopUp, DashboardPageLayout, DiagramList, LandingScrollLayout} from "../../component";
import {useInfiniteScroll, useToggle} from "../../hooks";
import {useParams} from "react-router-dom";
import {MButton} from "../../component/base";
import {useGetProjectDiagramsQuery} from "../../api";

export const ProjectDiagramsPage = () => {
    const createDiagramPopUpManager = useToggle()

    const {cursorId, scrollRef, setParams} = useInfiniteScroll()


    const {projectId} = useParams<{ projectId: string }>()
    const {data: projectDiagrams, isLoading,} = useGetProjectDiagramsQuery({
        projectId,
        cursorId,
    }, {
        refetchOnMountOrArgChange: true,
        skip: !projectId,
    })

    useEffect(() => {
        setParams({
            lastProjectId: projectDiagrams?.diagrams[projectDiagrams.diagrams.length - 1]?.id,
            isLoading,
        })
    }, [projectDiagrams, isLoading]);

    return (
        <DashboardPageLayout pageName={"Diagrams"}>
            {projectId && <CreateDiagramPopUp
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
                {projectDiagrams && <DiagramList diagrams={projectDiagrams.diagrams}/>}
            </LandingScrollLayout>


        </DashboardPageLayout>
    );
};
