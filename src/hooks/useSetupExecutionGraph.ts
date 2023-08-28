import {useUpdateExecutionGraphPropertiesMutation} from "../api";
import {useDiagramEditorState} from "../redux";
import {IUpdateExecutionGraphPropertiesResponse} from "../interface";

export const useSetupExecutionGraph = () => {
    const {currentDiagramId} = useDiagramEditorState()
    const [updateExecutionProperties] = useUpdateExecutionGraphPropertiesMutation();
    const updateExecutionGridProperties = (params?: Omit<IUpdateExecutionGraphPropertiesResponse, 'diagramId'>) => {
        if (currentDiagramId && params) {
            updateExecutionProperties({
                diagramId: currentDiagramId,
                ...params
            })
        }
    }
    return {
        updateExecutionGridProperties,
    }
}
