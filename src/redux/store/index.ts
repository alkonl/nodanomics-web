import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query'
import {baseApi} from '../../api'
import {diagramEditorSlice} from "./diagramEditor";
import {projectDashboardSlice} from "./projectDashboard";
import {teamDashboardSlice} from "./teamDashboard";
import {diagramDashboardSlice} from "./diagramDashboard";

const store = configureStore({
    reducer: combineReducers({
        [baseApi.reducerPath]: baseApi.reducer,
        [projectDashboardSlice.name]: projectDashboardSlice.reducer,
        [diagramEditorSlice.name]: diagramEditorSlice.reducer,
        [teamDashboardSlice.name]: teamDashboardSlice.reducer,
        [diagramDashboardSlice.name]: diagramDashboardSlice.reducer,
    }),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
})

setupListeners(store.dispatch)

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export * from './diagramDashboard'
export * from './diagramEditor'
export * from './teamDashboard'
export * from './projectDashboard'
