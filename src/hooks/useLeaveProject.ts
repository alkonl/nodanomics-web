import {useIsCurrentUserProjectOwner} from "./useIsCurrentUserProjectOwner";
import {useLeaveProjectTeamMutation} from "../api";
import {useEffect} from "react";
import {projectDashboardAction, useAppDispatch} from "../redux";


export const useLeaveProject = (params: {
    projectId: string,
}) => {
    const dispatch = useAppDispatch()
    const {addDeleteProjectId} = projectDashboardAction
    const isCurrentUserProjectOwner = useIsCurrentUserProjectOwner({
        projectId: params.projectId,
    })
    const [sendLeaveProjectTeam, resLeaveProject] = useLeaveProjectTeamMutation()

    useEffect(() => {
        if (resLeaveProject.isSuccess) {
            dispatch(addDeleteProjectId({projectId: params.projectId}))
        }
    }, [resLeaveProject.isSuccess])

    if (isCurrentUserProjectOwner.isLoading || isCurrentUserProjectOwner.isCurrentUserProjectOwner) {
        return {
            isUserCanLeaveProject: false,
        }
    }

    const leaveProject = () => {
        sendLeaveProjectTeam({
            projectId: params.projectId,
        })
    }

    return {
        isUserCanLeaveProject: true,
        leaveProject,
    }
}
