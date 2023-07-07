import {EProjectDateGroup} from "./projectGroup";
import {IBaseProject} from "./project";

export type IGroupedProjects = {
    group: {
        name: EProjectDateGroup
        value: number
    }
    projects: IBaseProject[]
}[]
