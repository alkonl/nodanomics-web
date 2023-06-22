import {useSession} from "./useSession";
import {useMemo} from "react";

export const useShouldLoadRoute = () => {
    const session = useSession()
    return useMemo(() => {
        if (session && session.invalidClaims.length === 0) {
            return true
        }
        return false
    }, [session])
}