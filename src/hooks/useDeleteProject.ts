import {useDeleteProjectMutation, useGetProjectInfoQuery, useSessionUserDataQuery} from "../api";
import {projectDashboardAction, useAppDispatch} from "../redux";
import {useEffect} from "react";

export const useDeleteProject = (params: {
    projectId: string;
}) => {
    const dispatch = useAppDispatch()
    const {addDeleteProjectId} = projectDashboardAction
    const {data: projectInfo} = useGetProjectInfoQuery({
        projectId: params.projectId,
    })
    const [sendDeleteProject, resDeleteProject] = useDeleteProjectMutation()

    const {data: currentUser} = useSessionUserDataQuery(undefined)


    useEffect(() => {
        if (resDeleteProject.isSuccess) {
            dispatch(addDeleteProjectId({projectId: params.projectId}))
        }
    }, [resDeleteProject.isSuccess])

    if (!currentUser || !projectInfo) {
        return {
            isLoading: true,
        }
    }

    if (currentUser.id !== projectInfo.creator.id) {
        return {
            isLoading: false,
            isUserCanDeleteProject: false,
            errorMessage: "Only the creator of the project can delete it"
        }
    }
    const deleteProject = () => {
        sendDeleteProject({projectId: params.projectId})
    }


    return {
        isLoading: false,
        isUserCanDeleteProject: true,
        deleteProject: deleteProject,
        resDeleteProject: resDeleteProject,
    }
}
