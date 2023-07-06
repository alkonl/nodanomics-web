import {EProjectDateGroup, IBaseProject, IGroupedProjects} from "../interface";

const groupValue: {
    [key in EProjectDateGroup]: number
} = {
    [EProjectDateGroup.DAY]: 1,
    [EProjectDateGroup.WEEK]: 7,
    [EProjectDateGroup.MONTH]: 30,
    [EProjectDateGroup.YEAR]: 365,
    [EProjectDateGroup.OLDER]: Infinity,
}

export const addToGroup = (params: { allGroups: IGroupedProjects, project: IBaseProject, addTo: EProjectDateGroup }) => {
    const {allGroups, project, addTo} = params
    const group = allGroups.find(({group}) => group.name === addTo)
    if (group) {
        group.projects.push(project)
    } else {
        allGroups.push({
            group: {
                name: addTo,
                value: groupValue[addTo],
            },
            projects: [project]
        })
    }
}
