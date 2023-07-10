import {projectDashboardAction, useAppDispatch, useProjectDashboardState} from "../redux";
import {useDidMountEffect} from "./useDidMountEffect";

export const useAutoSelectFirstProject = () => {
    const dispatch = useAppDispatch()

    const projects = useProjectDashboardState().projects

    // auto select first project
    useDidMountEffect(() => {
        if (projects.length > 0) {
            const projectId = projects[0].id
            dispatch(projectDashboardAction.setSelectedProjectId({
                projectId: projectId
            }))
        }
    }, [projects])
}
