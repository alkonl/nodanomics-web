
export interface ISignUpRequest {
    email: string,
    password: string,
    phoneNumber: string,
    firstName: string,
    lastName: string
}

export interface ISignUpErrorResponse {
    status: 'FIELD_ERROR';
    formFields: {
        error: string;
        id: string;
    }[]
}