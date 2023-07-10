import {DragEvent, useCallback} from "react";
import {EDiagramNode} from "../interface";
import {createNode} from "../service";
// eslint-disable-next-line import/named
import {ReactFlowInstance} from "reactflow";
import {diagramEditorActions, useAppDispatch} from "../redux";

export const useOnDrop = ({flowWrapper, flowInstance}:{
    flowWrapper?: HTMLDivElement
    flowInstance?: ReactFlowInstance
}) =>{
    const dispatch = useAppDispatch()
    const {addNode} = diagramEditorActions

  return   useCallback(
        (event: DragEvent<HTMLDivElement>) => {
            if (flowWrapper && flowInstance) {
                event.preventDefault();

                const type = event.dataTransfer.getData('application/reactflow') as EDiagramNode;

                // check if the dropped element is valid
                if (typeof type === 'undefined' || !Object.values(EDiagramNode).includes(type)) {
                    console.log(`Invalid element type: ${type}`)
                    return;
                }
                const newNode = createNode({
                    type,
                    flowInstance,
                    event,
                    wrapperNode: flowWrapper
                })
                if (newNode) {
                    dispatch(addNode(newNode))
                }
            }
        },
        [flowInstance]
    );
}
