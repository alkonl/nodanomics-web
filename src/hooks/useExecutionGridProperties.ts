import {useDiagramEditorState} from "../redux";
import {IExecutionGridProperties} from "../interface";

export const useExecutionGridProperties = (): IExecutionGridProperties | undefined => {
    const {executionGrid} = useDiagramEditorState()
    return executionGrid?.properties
}
