import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import {useEffect, useRef} from "react";

export const useInvokeStep = () => {

    const dispatch = useAppDispatch()
    const {isDiagramRunning, isDiagramRunningInterval, executionDuration, currentRunningDiagramStep, targetSteps} = useDiagramEditorState()
    const {invokeStep, setIsDiagramRunning, updateCompletedSteps} = diagramEditorActions

    const refStepInfo = useRef<{
        currentRunningDiagramStep: number,
        targetSteps: number | undefined,
    } | undefined>();

    useEffect(() => {
        refStepInfo.current = {
            currentRunningDiagramStep,
            targetSteps,
        }
    }, [currentRunningDiagramStep, targetSteps]);

    const updateCompletedStep = (count?: number) => {
        dispatch(updateCompletedSteps(count))
    }

    useEffect(() => {
        if (!isDiagramRunning) {
            updateCompletedStep(currentRunningDiagramStep)
        }
    }, [isDiagramRunning]);

    const runStep = () => {
        dispatch(invokeStep())
    }

    const refRunOneStepTimeOut = useRef<NodeJS.Timeout | undefined>(undefined)

    const runOneStep = () => {
        runStep()
        if (!isDiagramRunningInterval) {
            dispatch(setIsDiagramRunning({
                isRunning: true
            }))
            if (!isDiagramRunning) {
                refRunOneStepTimeOut.current = setTimeout(() => {
                    dispatch(setIsDiagramRunning({
                        isRunning: false
                    }))
                    updateCompletedStep()
                    clearTimeout(refRunOneStepTimeOut.current)
                }, executionDuration)
            }
        }
    }


    useEffect(() => {
        let interval: NodeJS.Timer | undefined
        let updateStepFinishedInterval: NodeJS.Timer | undefined
        if (isDiagramRunningInterval) {
            runStep()
            interval = setInterval(() => {
                const stepInfo = refStepInfo.current
                if (!stepInfo?.targetSteps || stepInfo.currentRunningDiagramStep < stepInfo.targetSteps) {
                    updateCompletedStep()
                    runStep()
                } else {
                    dispatch(setIsDiagramRunning({
                        isRunning: false,
                        isDiagramRunningInterval: false,
                    }))
                }
            }, executionDuration)

        } else {
            if (interval) {
                clearInterval(interval)
            }
        }
        return () => {
            if (interval) {
                clearInterval(interval)
                clearTimeout(updateStepFinishedInterval)
            }
        }
    }, [isDiagramRunningInterval])

    const toggleStepInterval = () => {
        clearTimeout(refRunOneStepTimeOut.current)
        dispatch(setIsDiagramRunning({
            isRunning: !isDiagramRunning,
            isDiagramRunningInterval: !isDiagramRunningInterval
        }))
    }
    return {runStep: runOneStep, isRunning: isDiagramRunning, toggleStepInterval}
}
