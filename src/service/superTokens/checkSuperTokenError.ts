import {ISignUpErrorResponse} from "../../interface";


export const checkSuperTokenError = (variable: unknown): variable is ISignUpErrorResponse => {
    return variable instanceof Object && 'status' in variable;
}