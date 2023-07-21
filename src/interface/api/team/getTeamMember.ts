export type IGetProjectTeamMemberRequestDto = {
    diagramId?: string;
    userId?: string;
}

export interface IGetProjectTeamMemberResponseDto {
    id: string;
    userId: string;
    projectTeamId: string;
    updatedAt: Date;
    createdAt: Date;
}
