import {useEffect} from "react";

export const useTimeout = (callback: ()=> void, timeout: number, deps?: unknown[]) => {
    useEffect(() => {
        const timeoutReference = setTimeout(callback, timeout);

        return () => clearTimeout(timeoutReference);
    }, deps)
}
