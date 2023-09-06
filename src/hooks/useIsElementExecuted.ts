import {IDiagramConnectionData, INodeData, isIIsElementExecuted} from "../interface";
import {useIsStepStarted} from "./useIsStepStarted";
import {useMemo} from "react";

export const useIsElementExecuted = (element?: INodeData | IDiagramConnectionData) => {
    const isStepStarted = useIsStepStarted()

    return useMemo(() => {
        if (element && isIIsElementExecuted(element)) {
            return isStepStarted && element.isExecuted
        }
        return false
    }, [isStepStarted])
}
