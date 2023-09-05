import {useDiagramEditorState} from "../redux";
import {useEffect, useState} from "react";

export const useIsStepStarted = () => {
    const {currentRunningDiagramStep, isDiagramRunning, completedSteps, executionDuration} = useDiagramEditorState()

    const [isPlay, setIsPlay] = useState(false)

    useEffect(() => {
        let timeout: NodeJS.Timeout
        if (isDiagramRunning) {
            setIsPlay(true)
            timeout = setTimeout(() => {
                setIsPlay(false)
            }, (executionDuration || 1000) - 100)
        } else {
            setIsPlay(false)
        }
        return () => clearTimeout(timeout)
    }, [currentRunningDiagramStep, completedSteps]);
    return isPlay
}
