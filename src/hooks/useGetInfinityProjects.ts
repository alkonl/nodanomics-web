import React, {useEffect, useRef} from "react";
import {useGetProjectsQuery} from "../api";
import {useScrollToBottom} from "./usePageBottom";
import {IBaseProject} from "../interface";
import {projectDashboardAction, useAppDispatch} from "../redux";

export const useGetInfinityProjects = () => {
    const dispatch = useAppDispatch()
    const scrollRef = useRef<HTMLDivElement>(null);
    const [cursorId, setCursorId] = React.useState<string>();
    const prevProjectCursorId = useRef<string>();
    const {data: allProjects, isLoading} = useGetProjectsQuery({
        cursorId: cursorId,
    })
    const reachedBottom = useScrollToBottom(scrollRef)
    useEffect(() => {
        const lastProject = allProjects?.[allProjects.length - 1]
        if (reachedBottom && lastProject && lastProject.id !== prevProjectCursorId.current && !isLoading) {
            prevProjectCursorId.current = lastProject.id
            setCursorId(lastProject.id)
        }
    }, [reachedBottom])


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

    return {
        scrollRef,
    }
}
