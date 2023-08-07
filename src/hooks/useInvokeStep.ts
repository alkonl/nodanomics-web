import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import {useEffect, useState} from "react";
import {DIAGRAM_RUN_DURATION} from "../constant";

export const useInvokeStep = () => {
    const [isManyRuns, setIsManyRuns] = useState(false)
    const dispatch = useAppDispatch()
    const {isDiagramRunning} = useDiagramEditorState()
    const {invokeStep, setIsDiagramRunning} = diagramEditorActions

    const runStep = () => {
        dispatch(invokeStep())
    }

    const runOneStep = () => {
        runStep()
        if(!isManyRuns) {
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
        if (isManyRuns) {
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
    }, [isManyRuns])

    const toggleStepInterval = () => {
        setIsManyRuns(!isManyRuns)
        dispatch(setIsDiagramRunning({
            isRunning: !isDiagramRunning
        }))
    }
    return {runStep: runOneStep , isRunning: isDiagramRunning, toggleStepInterval}
}
