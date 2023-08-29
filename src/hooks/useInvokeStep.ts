import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import {useEffect} from "react";
import {DIAGRAM_RUN_DURATION} from "../constant";

export const useInvokeStep = () => {

    const dispatch = useAppDispatch()
    const {isDiagramRunning, isDiagramRunningInterval, currentRunningDiagramStep} = useDiagramEditorState()
    const {invokeStep, setIsDiagramRunning, updateCompletedSteps} = diagramEditorActions

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

    const runOneStep = () => {
        runStep()
        if (!isDiagramRunningInterval) {
            dispatch(setIsDiagramRunning({
                isRunning: true
            }))
            const timeOut = setTimeout(() => {
                dispatch(setIsDiagramRunning({
                    isRunning: false
                }))
                updateCompletedStep()
                clearTimeout(timeOut)
            }, DIAGRAM_RUN_DURATION)
        }
    }


    useEffect(() => {
        let interval: NodeJS.Timer | undefined
        let updateStepFinishedInterval: NodeJS.Timer | undefined
        if (isDiagramRunningInterval) {
            runStep()
            interval = setInterval(() => {
                updateCompletedStep()
                runStep()
            }, DIAGRAM_RUN_DURATION)

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
        dispatch(setIsDiagramRunning({
            isRunning: !isDiagramRunning,
            isDiagramRunningInterval: !isDiagramRunningInterval
        }))
    }
    return {runStep: runOneStep, isRunning: isDiagramRunning, toggleStepInterval}
}
