import {useProjectDashboardState} from "../redux";
import {EProjectDateGroup, IGroupedProjects} from "../interface";
import {useMemo} from "react";
import moment from "moment/moment";
import {addToGroup} from "../utils";

export const useGroupProjectsByGroup = (): IGroupedProjects => {
    const {projects} = useProjectDashboardState()

    return useMemo(() => {
        return projects.reduce((acc: IGroupedProjects, project) => {
            const createdAt = moment(project.createdAt)
            const now = moment.now()
            const differenceInDays = Math.abs(createdAt.diff(now, 'days'))
            if (differenceInDays === 0) {
                addToGroup({allGroups: acc, project, addTo: EProjectDateGroup.DAY})
            } else if (differenceInDays < 7) {
                addToGroup({allGroups: acc, project, addTo: EProjectDateGroup.WEEK})
            } else if (differenceInDays < 30) {
                addToGroup({allGroups: acc, project, addTo: EProjectDateGroup.MONTH})
            } else if (differenceInDays < 365) {
                addToGroup({allGroups: acc, project, addTo: EProjectDateGroup.YEAR})
            } else {
                addToGroup({allGroups: acc, project, addTo: EProjectDateGroup.OLDER})
            }
            return acc
        }, []).sort((a, b) => a.group.value - b.group.value)
    }, [projects])
}
