import {IBaseProject} from "../../interface";
// eslint-disable-next-line import/named
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IProjectDashboardState {
    projects: IBaseProject[];
    selectedProjectId?: string;
}

const initialState: IProjectDashboardState = {
    projects: [],
}

export const projectDashboardSlice = createSlice({
    name: 'projectDashboard',
    initialState,
    reducers: {
        setProjects: (state, action: PayloadAction<{
            projects: IBaseProject[]
        }>) => {
            state.projects = action.payload.projects
        },
        setSelectedProjectId: (state, action: PayloadAction<{
            projectId: string
        }>) => {
            state.selectedProjectId = action.payload.projectId
        }
    }
})

export const projectDashboardAction = projectDashboardSlice.actions
