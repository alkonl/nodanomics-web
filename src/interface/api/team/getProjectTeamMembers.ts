export type IGetProjectTeamMembersRequest = {
    diagramId?: string
} | {
    projectId?: string
}

export interface IGetProjectTeamMembersResponse {
    projectId: string
    members: {
        userId: string
        id: string
        firstName: string
        lastName: string
        email: string
    }[]
}
