import {useSession} from "./useSession";
import {useMemo} from "react";

export const useShouldLoadRoute = () => {
    const session = useSession()
    return useMemo(() => {
        if (!session) {
            return {isLoading: true}
        }
        if (session.invalidClaims.length === 0) {
            return {isLoading: false, hasInvalidClaims: false}
        }
        return {isLoading: false, hasInvalidClaims: true}
    }, [session])
}
