import {useSessionUserDataQuery} from "../api";

export const useCurrentUser = () => {
    const {data} = useSessionUserDataQuery(undefined)
    return {
        currentUser: data,
    }
}
