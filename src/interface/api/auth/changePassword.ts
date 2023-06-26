export interface IChangePasswordRequest {
    oldPassword: string;
    newPassword: string;
}

export interface IChangePasswordResponse {
    message: string;
}
