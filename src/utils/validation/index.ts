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
    companyName: z.string().min(3).optional(),
    clientRole: z.object({
        id: z.string().optional(),
        name: z.string(),
    }).optional(),
    billingAddress: z.string(),
    city: z.string().min(3),
    postalCode: z.string().min(3),
    country: z.string(),
    cardNumber: z.string().refine((value)=> {
        console.log(value)
       return /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/.test(value.trim())
    }, 'Card number is not valid'),
    cardHolderName: z.string(),
    expirationDate: z.string().max(5).min(5).refine((value)=> /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(value), 'Expiration date is not valid'),
    cvv: z.string().max(4).min(3).refine((value)=> /^[0-9]{3,4}$/.test(value), 'CVV is not valid'),
}
