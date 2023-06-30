import {z} from "zod";


export const validation = {
    email: z.string().email(),
    password: z
        .string()
        .min(2, 'password should have at least 2 alphabets')
        .max(20, 'password should be no longer than 20 alphabets')
        .refine((value) => /[a-zA-Z]/.test(value), 'password should contain only alphabets'),
    // eslint-disable-next-line
    phoneNumber: z.string().refine((value) => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(value), 'Phone number is not valid. example +919367788755'),
    firstName:  z.string().min(3),
    lastName:  z.string().min(3),
    diagramName:  z.string().min(3),
    diagramDescription:  z.string().min(3),
    diagramTags:  z.array(z.object({
        id: z.string().optional(),
        name: z.string(),
    })).optional(),
    searchTerm: z.string().min(3),
}
