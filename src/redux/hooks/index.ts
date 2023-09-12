// eslint-disable-next-line import/named
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {
    AppDispatch,
    IDiagramEditorState,
    ITeamDashboardState,
    RootState,
    IProjectDashboardState, IDiagramDashboardState
} from '../store'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useDiagramEditorState = (): IDiagramEditorState => {
    return useAppSelector(state => state.diagramEditor)
}

export const useProjectDashboardState = (): IProjectDashboardState => {
    return useAppSelector(state => state.projectDashboard)
}

export const useTeamDashboardState = (): ITeamDashboardState => {
    return useAppSelector(state => state.teamDashboard)
}

export const useDiagramDashboardState = (): IDiagramDashboardState => {
    return useAppSelector(state => state.diagramDashboard)
}
