import {IServerErrorResponse} from "../interface";
import z from 'zod'


export const serverErrorCheck = (error?: unknown): IServerErrorResponse | undefined => {
  const validationRules =  z.object({
        errorMessages: z.array(z.object({message: z.string()})),
    })
    if (typeof error !== 'object' && error !== null) {
        return undefined;
    }
    if (validationRules.safeParse(error).success) {
        return error as IServerErrorResponse;
    }
    if (error !== null && 'data' in error && validationRules.safeParse(error.data).success) {
        return error.data as IServerErrorResponse;
    }
}
