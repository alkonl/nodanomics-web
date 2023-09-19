import {IReactFlowNode} from "../interface";
import {useReactFlowInstance} from "./useReactFlowInstance";
import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import {findAllParents} from "../service";

export const useFocusNode = () => {
    const {diagramNodes} = useDiagramEditorState()
    const {reactFlowInstance} = useReactFlowInstance().data;
    const dispatch = useAppDispatch();

    return (selectedNodeToFocus: IReactFlowNode) => {

        const parents = findAllParents(selectedNodeToFocus, diagramNodes)
        const collapsedParents = parents.reverse().find(p => p.data.isCollapsed)
        const nodeToFocus = collapsedParents || selectedNodeToFocus

        const nodeSize = {
            width: nodeToFocus.width || 250,
            height: nodeToFocus.height || 100,
        }
        const nodePosition = {
            x:  nodeToFocus.positionAbsolute?.x || nodeToFocus.position.x,
            y: nodeToFocus.positionAbsolute?.y || nodeToFocus.position.y,
        }
        const x = nodePosition.x + nodeSize.width / 2;
        const y = nodePosition.y + nodeSize.height / 2;
        const zoom = 1.85;

        reactFlowInstance?.setCenter(x, y, {zoom, duration: 600});
        dispatch(diagramEditorActions.setEditElement({
            id: selectedNodeToFocus.id,
            elementType: selectedNodeToFocus.data.elementType,
        }));
    };
}
