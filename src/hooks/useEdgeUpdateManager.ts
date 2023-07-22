import {useCallback, useRef} from "react";
// eslint-disable-next-line import/named
import {Edge, Connection} from "reactflow";
import {IReactFlowEdge, IReactFlowEdgeConnection} from "../interface";
import {diagramEditorActions, useAppDispatch} from "../redux";

export const useEdgeUpdateManager = () => {
    const edgeUpdateSuccessful = useRef(true);
    const dispatch = useAppDispatch()

    const onEdgeUpdateStartHandler = useCallback(() => {
        edgeUpdateSuccessful.current = false;
    }, []);


    const onEdgeUpdateHandler = useCallback((oldEdge: IReactFlowEdge, newConnection: IReactFlowEdgeConnection) => {
        edgeUpdateSuccessful.current = true;
        dispatch(diagramEditorActions.onEdgeUpdate({
            oldEdge,
            newConnection
        }))
    }, [dispatch]);

    const onEdgeUpdateEndHandler = useCallback((e: MouseEvent | TouchEvent, edge: Edge) => {
        if (!edgeUpdateSuccessful.current) {
            dispatch(diagramEditorActions.onEdgeUpdateEnd(edge))
        }

        edgeUpdateSuccessful.current = true;
    }, [dispatch]);

    return {
        onEdgeUpdateStartHandler,
        onEdgeUpdateHandler,
        onEdgeUpdateEndHandler
    }
}
