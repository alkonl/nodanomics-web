import {useProjectDashboardState} from "../redux";
import {IBaseProject, IGroupedItems} from "../interface";
import {useMemo} from "react";
import {groupByDate} from "../utils";


export const useGroupProjectsByGroup = (): IGroupedItems<IBaseProject> => {
    const {projects} = useProjectDashboardState()

    return useMemo(() => {
        return groupByDate(projects, 'createdAt')
    }, [projects])
}
