import {useIsCurrentUserProjectOwner} from "./useIsCurrentUserProjectOwner";
import {useDeleteTeamMemberFromProjectTeamMutation} from "../api";

export const useDeleteTeamMemberFromProjectTeam = (params: {
    projectId: string,
}) => {

    const {isCurrentUserProjectOwner} = useIsCurrentUserProjectOwner({
        projectId: params.projectId,
    })
    const [sendDeleteTeamMember, resDeleteTeamMember] = useDeleteTeamMemberFromProjectTeamMutation()

    if (!isCurrentUserProjectOwner) {
        return {
            isUserCanDeleteTeamMember: false,
        }
    }

    const deleteTeamMember = (params: {
        teamMemberId: string;
    }) => {
        sendDeleteTeamMember({
            teamMemberId: params.teamMemberId,
        })
    }

    return {
        isUserCanDeleteTeamMember: true,
        deleteTeamMember,
        resDeleteTeamMember,
    }
}
