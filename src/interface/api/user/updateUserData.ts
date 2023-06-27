export interface IUpdateUserDataRequest {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
}

export interface IUpdateUserDataResponse {
    id: string
    authId: string
    email: string
    firstName: string
    lastName: string
    phoneNumber: string | null
}
