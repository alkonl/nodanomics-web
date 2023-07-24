import {useCallback, useRef} from "react";
// eslint-disable-next-line import/named
import {Edge, Connection} from "reactflow";
import {IReactFlowEdge, IReactFlowEdgeConnection, isIReactFlowEdgeConnection} from "../interface";
import {diagramEditorActions, useAppDispatch} from "../redux";

export const useEdgeUpdateManager = () => {
    const edgeUpdateSuccessful = useRef(true);
    const dispatch = useAppDispatch()

    const onEdgeUpdateStartHandler = useCallback(() => {
        edgeUpdateSuccessful.current = false;
    }, []);


    const {onEdgeUpdate,onEdgeUpdateEnd, renderState} = diagramEditorActions

    const onEdgeUpdateHandler = useCallback((oldEdge: IReactFlowEdge, newConnection: Connection) => {
        edgeUpdateSuccessful.current = true;
        dispatch(onEdgeUpdate({
            oldEdge,
            newConnection
        }))
        dispatch(renderState())
    }, [dispatch]);

    const onEdgeUpdateEndHandler = useCallback((e: MouseEvent | TouchEvent, edge: Edge) => {
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
