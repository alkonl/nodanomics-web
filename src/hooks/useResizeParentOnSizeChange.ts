import {useEffect} from "react";
import {resizeParent} from "../service";
// eslint-disable-next-line import/named
import {NodeProps} from "reactflow";
import {IMicroLoopNodeData, IWhileLoopNodeData} from "../interface";
import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";

export const useResizeParentOnSizeChange = (params: NodeProps<IMicroLoopNodeData | IWhileLoopNodeData>) => {
    const dispatch = useAppDispatch()
    const {diagramNodes} = useDiagramEditorState()

    const updateNodeSize = (params: {
        nodeId: string,
        size: { width: number, height: number }
    }) => {
        dispatch(diagramEditorActions.updateNodeSize(params))
    }

    const node = diagramNodes.find(node => node.id === params.id)

    useEffect(() => {
        if (node?.parentNode) {
            resizeParent({
                node,
                addHeight: 200,
                addWidth: 200,
                diagramNodes,
                updateNodeSize
            })
        }
    }, [node?.width, node?.height]);
}
