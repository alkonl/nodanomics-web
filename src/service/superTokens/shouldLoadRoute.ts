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

        }, 10000)
        return () => clearTimeout(timeOut)
    }, [session]);

    return useMemo(() => {
        console.info('wait: ', isNoSessionMoreThan2Seconds)
        if (isNoSessionMoreThan2Seconds) {
            return {isLoading: false, hasInvalidClaims: true}
        }

        if (!session) {
            console.info('no session')
            return {isLoading: true}
        }
        if (!session.loading) {
            console.info('claims: ',  session.invalidClaims, session)
            return {isLoading: false, hasInvalidClaims: session.invalidClaims.length > 0}
        }
        return {isLoading: true}
    }, [session, isNoSessionMoreThan2Seconds])
}
