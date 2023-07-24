import {useCallback} from "react";
// eslint-disable-next-line import/named
import {Connection} from "reactflow";
import {connectEdge} from "../service";
import {diagramEditorActions, useAppDispatch} from "../redux";

export const useOnConnect = () => {
    const dispatch = useAppDispatch()
    const {onConnect} = diagramEditorActions
    return useCallback((params: Connection) => {
        const edge = connectEdge({
            connection: params,
        })
        dispatch(onConnect(edge))
    }, [dispatch])
}
