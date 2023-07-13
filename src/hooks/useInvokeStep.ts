import {diagramEditorActions, useAppDispatch} from "../redux";
import {useEffect, useState} from "react";

export const useInvokeStep = () => {
    const [isRunning, setIsRunning] = useState(false)
    const dispatch = useAppDispatch()
    const {invokeStep} = diagramEditorActions

    const runStep = () => {
        dispatch(invokeStep())
    }

    useEffect(() => {
        let interval: NodeJS.Timer | undefined
        if (isRunning) {
            interval = setInterval(runStep, 1000)
        }
        return () => {
            if (interval) {
                clearInterval(interval)
            }
        }
    }, [isRunning])

    const runStepInterval = () => {
        setIsRunning(!isRunning)
    }
    return {runStepInterval, isRunning, runStep}
}
