import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import {useEffect, useState} from "react";


export const useManageExecutionDuration = () => {
    const dispatch = useAppDispatch()
    const {executionDuration} = useDiagramEditorState()
    const {setExecutionDuration} = diagramEditorActions
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
    const [seconds, setSeconds] = useState<string | undefined>(executionDuration
        ? (executionDuration / 1000)?.toFixed(2) : '')

    const changeExecutionDuration = (duration: string) => {
        setSeconds(duration)
    }
    const showErrorMessage = () => {
        setErrorMessage('Execution duration must be greater than 0.5 seconds')
    }


    useEffect(() => {
        if (seconds) {
            const value = Number(seconds)
            const multiplied = value * 1000
            if (multiplied >= 500) {
                dispatch(setExecutionDuration(multiplied))
            } else {
                showErrorMessage()
            }
        } else {
            showErrorMessage()
        }
    }, [seconds]);


    return {
        changeExecutionDuration,
        executionDurationSeconds: seconds,
        errorMessage,
    }
}
