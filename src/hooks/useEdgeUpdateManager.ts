import {useCallback, useRef} from "react";
// eslint-disable-next-line import/named
import {Edge, Connection} from "reactflow";
import {IDiagramConnectionData, IReactFlowEdge, IReactFlowEdgeConnection} from "../interface";
import {diagramEditorActions, useAppDispatch} from "../redux";
import {useOffHistoryExecuted} from "./useOffHistoryExecuted";
import {parseConnectionHandleId} from "../service";

export const useEdgeUpdateManager = () => {
    const edgeUpdateSuccessful = useRef(true);
    const dispatch = useAppDispatch()

    const onEdgeUpdateStartHandler = useCallback(() => {
        edgeUpdateSuccessful.current = false;
    }, []);

    const offHistoryExecuted = useOffHistoryExecuted()
    const {onEdgeUpdate,onEdgeUpdateEnd, renderState} = diagramEditorActions

    const onEdgeUpdateHandler = useCallback((oldEdge: IReactFlowEdge, newConnection: Connection) => {
        offHistoryExecuted('onEdgeUpdateHandler')
        edgeUpdateSuccessful.current = true;
        const oldEdgeData = oldEdge.data as IDiagramConnectionData
        if (newConnection.sourceHandle === null || newConnection.targetHandle === null) {
            throw new Error('sourceHandle and targetHandle null')
        }
        if (newConnection.source === null || newConnection.target === null) {
            throw new Error('source and target null')
        }
        const sourceMode = parseConnectionHandleId(newConnection.sourceHandle).mode;
        const targetMode = parseConnectionHandleId(newConnection.targetHandle).mode;
        const sourceSide = parseConnectionHandleId(newConnection.sourceHandle).side;
        const targetSide = parseConnectionHandleId(newConnection.targetHandle).side;
        const newConnectionWithInfo: IReactFlowEdgeConnection = {
            ...newConnection,
            data: {
                ...oldEdgeData,
                sourceId: newConnection.source,
                targetId: newConnection.target,
                sourceMode: sourceMode,
                targetMode: targetMode,
                sourceSide,
                targetSide,
            }
        }
        dispatch(onEdgeUpdate({
            oldEdge,
            newConnection: newConnectionWithInfo
        }))
        dispatch(renderState())

    }, [dispatch]);

    const onEdgeUpdateEndHandler = useCallback((e: MouseEvent | TouchEvent, edge: Edge) => {
        offHistoryExecuted('onEdgeUpdateEndHandler')
        if (!edgeUpdateSuccessful.current) {
            dispatch(onEdgeUpdateEnd(edge))
            dispatch(renderState())
        }

        edgeUpdateSuccessful.current = true;
    }, [dispatch]);

    return {
        onEdgeUpdateStartHandler,
        onEdgeUpdateHandler,
        onEdgeUpdateEndHandler
    }
}
