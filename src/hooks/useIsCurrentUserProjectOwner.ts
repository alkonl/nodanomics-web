import {useCurrentUser} from "./useCurrentUser";
import {useGetProjectInfoQuery} from "../api";

export const useIsCurrentUserProjectOwner = (params: {
    projectId: string;
}) => {
    const {currentUser} = useCurrentUser()


    const {data: projectInfo} = useGetProjectInfoQuery({
        projectId: params.projectId,
    })

    if (!currentUser || !projectInfo) {
        return {
            isLoading: true,
            isCurrentUserProjectOwner: false,
        }
    }

    if (currentUser.id !== projectInfo.creator.id) {
        return {
            isLoading: false,
            isCurrentUserProjectOwner: false,
        }
    }

    return  {
        isLoading: false,
        isCurrentUserProjectOwner: true,
    }
}
