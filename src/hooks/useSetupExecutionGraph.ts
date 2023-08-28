import {useUpdateExecutionGraphPropertiesMutation} from "../api";
import {useDiagramEditorState} from "../redux";

export const useSetupExecutionGraph = () => {
    const {currentDiagramId} = useDiagramEditorState()
    const [updateExecutionProperties] = useUpdateExecutionGraphPropertiesMutation();
    const changeGridColor = (color?: string) => {
        if (currentDiagramId && color) {
            updateExecutionProperties({
                gridColor: color,
                diagramId: currentDiagramId,
            })
        }
    }
    return {
        changeGridColor,
    }
}
