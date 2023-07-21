export interface IGetProjectTeamMemberRequest {
    diagramId?: string
}

export interface IGetProjectTeamMemberResponse {
    projectId: string
    members: {
        userId: string
        id: string
        firstName: string
        lastName: string
        email: string
    }[]

}
