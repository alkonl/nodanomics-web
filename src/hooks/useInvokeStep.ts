import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import {useEffect} from "react";
import {DIAGRAM_RUN_DURATION} from "../constant";

export const useInvokeStep = () => {

    const dispatch = useAppDispatch()
    const {isDiagramRunning, isDiagramRunningInterval} = useDiagramEditorState()
    const {invokeStep, setIsDiagramRunning} = diagramEditorActions

    const runStep = () => {
        console.log('runStep')
        dispatch(invokeStep())
    }

    const runOneStep = () => {
        runStep()
        if(!isDiagramRunningInterval) {
            dispatch(setIsDiagramRunning({
                isRunning: true
            }))
            const timeOut = setTimeout(() => {

                dispatch(setIsDiagramRunning({
                    isRunning: false
                }))
                clearTimeout(timeOut)
            }, DIAGRAM_RUN_DURATION)
        }
    }


    useEffect(() => {
        let interval: NodeJS.Timer | undefined
        if (isDiagramRunningInterval) {
            interval = setInterval(runStep, DIAGRAM_RUN_DURATION)
        } else {
            if (interval) {
                clearInterval(interval)
            }
        }
        return () => {
            if (interval) {
                clearInterval(interval)
            }
        }
    }, [isDiagramRunningInterval])

    const toggleStepInterval = () => {
        dispatch(setIsDiagramRunning({
            isRunning: !isDiagramRunning,
            isDiagramRunningInterval: !isDiagramRunningInterval
        }))
    }
    return {runStep: runOneStep , isRunning: isDiagramRunning, toggleStepInterval}
}
