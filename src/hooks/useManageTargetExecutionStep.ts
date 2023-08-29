import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";

const {setExecutionTargetStep} = diagramEditorActions


export const useManageTargetExecutionStep = () => {
    const dispatch = useAppDispatch()
    const {targetSteps} = useDiagramEditorState()
    const changeTargetExecutionStep = (targetStep: string | number) => {
        const targetStepNumber = typeof targetStep === 'string'
            ? parseInt(targetStep)
            : Math.round(targetStep)
        if (!targetStep) {
            dispatch(setExecutionTargetStep(undefined))
        } else if (!isNaN(targetStepNumber)) {
            dispatch(setExecutionTargetStep(targetStepNumber))
        }
    }
    return {
        targetSteps,
        changeTargetExecutionStep,
    }
}
