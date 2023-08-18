import {useSession} from "./useSession";
import {useEffect, useMemo, useState} from "react";

export const useShouldLoadRoute = () => {
    const session = useSession()
    const [isNoSessionMoreThan2Seconds, setIsNoSessionMoreThan2Seconds] = useState(false)

    useEffect(() => {
        const timeOut = setTimeout(() => {
            if (!session) {
                clearTimeout(timeOut)
                return setIsNoSessionMoreThan2Seconds(true)
            }

        }, 2000)
        return () => clearTimeout(timeOut)
    }, [session]);

    return useMemo(() => {
        console.log('session', session, isNoSessionMoreThan2Seconds)

        if (isNoSessionMoreThan2Seconds) {
            return {isLoading: false, hasInvalidClaims: true}
        }

        if (!session) {
            return {isLoading: true}
        }
        if (!session.loading && session.invalidClaims.length === 0) {
            return {isLoading: false, hasInvalidClaims: false}
        }

        return {isLoading: false, hasInvalidClaims: true}
    }, [session, isNoSessionMoreThan2Seconds])
}
