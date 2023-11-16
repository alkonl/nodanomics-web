import {useDiagramEditorState} from "../redux";
import {useGetProjectInfoQuery} from "../api";

export const useOpenedDiagramProject = () => {
    const {currentDiagramId} = useDiagramEditorState()
    const {data: resProjectInfo} = useGetProjectInfoQuery({
        diagramId: currentDiagramId,
    }, {
        skip: !currentDiagramId,
    })

    return resProjectInfo
}
