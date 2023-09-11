import React, {useEffect, useState} from 'react';
import {CreateDiagramPopUp, DashboardPageLayout, DiagramList, LandingScrollLayout} from "../../component";
import {useInfiniteScroll, useToggle} from "../../hooks";
import {useParams} from "react-router-dom";
import {MButton} from "../../component/base";
import {useGetProjectDiagramsQuery} from "../../api";

export const ProjectDiagramsPage = () => {
    // const [cursorId, setCursorId] = useState<string>();
    // const scrollRef = useRef<HTMLDivElement>(null);
    // const prevProjectCursorId = useRef<string>();

    const [lastCusrosId, setLastCursorId] = useState<string>()

    const createDiagramPopUpManager = useToggle()
    const {projectId} = useParams<{ projectId: string }>()
    const {data: projectDiagrams, isLoading, } = useGetProjectDiagramsQuery({
        projectId,
        cursorId: lastCusrosId,
    }, {
        refetchOnMountOrArgChange: true,
        skip: !projectId
    })

    const {cursorId, scrollRef} = useInfiniteScroll({
        lastProjectId: projectDiagrams?.diagrams[projectDiagrams.diagrams.length - 1].id,
        isLoading,
    })

    useEffect(() => {
        setLastCursorId(cursorId)
    }, [cursorId]);

    // const reachedBottom = useScrollToBottom(scrollRef)


    // useEffect(() => {
    //     const lastProject = projectDiagrams?.diagrams[projectDiagrams.diagrams.length - 1]
    //     if (reachedBottom && lastProject && lastProject.id !== prevProjectCursorId.current && !isLoading) {
    //         prevProjectCursorId.current = lastProject.id
    //         setCursorId(lastProject.id)
    //     }
    // }, [reachedBottom])

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
