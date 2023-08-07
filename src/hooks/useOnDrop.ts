import {DragEvent, useCallback} from "react";
import {createNodeOnDrag} from "../service";
// eslint-disable-next-line import/named
import {ReactFlowInstance} from "reactflow";
import {diagramEditorActions, useAppDispatch} from "../redux";
import {ECreatedNodeType, EDiagramNode} from "../interface";
import {useSetParentNode} from "./useSetParentNode";

export const useOnDrop = ({flowWrapper, flowInstance}: {
    flowWrapper?: HTMLDivElement
    flowInstance?: ReactFlowInstance
}) => {
    const dispatch = useAppDispatch()
    const {addNode, addCompoundNodes} = diagramEditorActions

    const setParent = useSetParentNode()

    return useCallback(
        (event: DragEvent<HTMLDivElement>) => {
            if (flowWrapper && flowInstance) {
                event.preventDefault();

                const type = event.dataTransfer.getData('application/reactflow') as EDiagramNode;

                // check if the dropped element is valid
                if (typeof type === 'undefined' || !Object.values(EDiagramNode).includes(type)) {
                    console.error(`Invalid element type: ${type}`)
                    return;
                }
                const newNode = createNodeOnDrag({
                    type,
                    flowInstance,
                    event,
                    wrapperNode: flowWrapper
                })
                if (newNode) {
                    if (newNode.type === ECreatedNodeType.MicroLoop) {
                        dispatch(addCompoundNodes(newNode))
                    } else if (newNode) {
                        dispatch(addNode(newNode.node))
                        setParent(newNode.node, flowInstance.getNodes())
                    }

                }
            }
        },
        [flowInstance, dispatch]
    );
}
