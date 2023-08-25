import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import {useEffect} from "react";
import {DIAGRAM_RUN_DURATION} from "../constant";

export const useInvokeStep = () => {

    const dispatch = useAppDispatch()
    const {isDiagramRunning, isDiagramRunningInterval} = useDiagramEditorState()
    const {invokeStep, setIsDiagramRunning} = diagramEditorActions
    // const [isStepFinished, setIsStepFinished] = useState(false)

    const updateIsStepFinished = (isFinished: boolean) => {
        dispatch(setIsDiagramRunning({
            isStepFinished: isFinished
        }))
    }

    const runStep = () => {
        dispatch(invokeStep())
        updateIsStepFinished(false)
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
                updateIsStepFinished(true)
                clearTimeout(timeOut)
            }, DIAGRAM_RUN_DURATION)
        }
    }


    useEffect(() => {
        let interval: NodeJS.Timer | undefined
        let intervalStepFinished: NodeJS.Timer | undefined
        if (isDiagramRunningInterval) {

            interval = setInterval(() => {
                runStep()
                intervalStepFinished = setTimeout(() => {
                    updateIsStepFinished(true)
                    clearTimeout(intervalStepFinished)
                }, DIAGRAM_RUN_DURATION - 50)
            }, DIAGRAM_RUN_DURATION)

        } else {
            updateIsStepFinished(true)
            if (interval) {
                clearInterval(interval)
            }
        }
        return () => {
            if (interval) {
                clearInterval(interval)
                clearTimeout(intervalStepFinished)
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
