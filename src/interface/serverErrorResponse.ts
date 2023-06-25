export interface IServerErrorResponse {
    errorMessages: { message: string }[];
    statusCode: number;
}
