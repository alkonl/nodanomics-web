import {useSessionUserDataQuery} from "../api";

export const useCurrentUser = () => {
    const {data, refetch, } = useSessionUserDataQuery(undefined)
    return {
        currentUser: data,
        refetch,
    }
}
