import {useCallback} from "react";
// eslint-disable-next-line import/named
import {Connection} from "reactflow";
import {connectEdge} from "../service";
import {diagramEditorActions, useAppDispatch} from "../redux";
import {EConnection} from "../interface";

export const useOnConnect = () => {
    const dispatch = useAppDispatch()
    const {onConnect} = diagramEditorActions
    return useCallback((params: Connection) => {
        const edge = connectEdge({
            connection: params,
            type: EConnection.DataConnection
        })
        dispatch(onConnect(edge))
    }, [dispatch])
}
