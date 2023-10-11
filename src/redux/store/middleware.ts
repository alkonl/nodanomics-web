import type {Middleware} from '@reduxjs/toolkit'
import {diagramEditorActions} from "./diagramEditor";
import {RootState} from "./index";
import {runManager} from "./diagramGraphInstance";



export const diagramEditorMiddlewares: Middleware<any> = (store) => (next) => async (action) => {
    const typedStore = store as RootState
    if (diagramEditorActions.invokeStep.match(action)) {
        await runManager.invokeStep()
    }


    return next(action)
}
