import React, {useEffect, useRef, useState} from 'react';
import {CreateDiagramPopUp, DashboardPageLayout, DiagramList, LandingScrollLayout} from "../../component";
import {useScrollToBottom, useToggle} from "../../hooks";
import {useParams} from "react-router-dom";
import {MButton} from "../../component/base";
import {useGetProjectDiagramsQuery} from "../../api";

export const ProjectDiagramsPage = () => {
    const [cursorId, setCursorId] = useState<string>();
    const scrollRef = useRef<HTMLDivElement>(null);
    const prevProjectCursorId = useRef<string>();

    const createDiagramPopUpManager = useToggle()
    const {projectId} = useParams<{ projectId: string }>()
    const {data: projectDiagrams, isLoading} = useGetProjectDiagramsQuery({
        projectId,
        cursorId,
    }, {
        refetchOnMountOrArgChange: true,
        skip: !projectId
    })

    const reachedBottom = useScrollToBottom(scrollRef)


    useEffect(() => {
        const lastProject = projectDiagrams?.diagrams[projectDiagrams.diagrams.length - 1]
        if (reachedBottom && lastProject && lastProject.id !== prevProjectCursorId.current && !isLoading) {
            prevProjectCursorId.current = lastProject.id
            setCursorId(lastProject.id)
        }
    }, [reachedBottom])

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
