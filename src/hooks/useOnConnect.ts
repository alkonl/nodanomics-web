import {useCallback} from "react";
// eslint-disable-next-line import/named
import {Connection} from "reactflow";
import {connectEdge} from "../service";
import {diagramEditorActions, useAppDispatch} from "../redux";
import {useOffHistoryExecuted} from "./useOffHistoryExecuted";

export const useOnConnect = () => {
    const dispatch = useAppDispatch()
    const {onConnect} = diagramEditorActions

    const offHistoryExecuted = useOffHistoryExecuted()

    return useCallback((params: Connection) => {
        offHistoryExecuted('onConnect')
        const edge = connectEdge({
            connection: params,
        })
        dispatch(onConnect(edge))

    }, [dispatch])
}
