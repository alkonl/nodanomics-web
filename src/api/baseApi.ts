// eslint-disable-next-line import/named
import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from '@reduxjs/toolkit/query/react'
import {
    emailPasswordSignIn,
    emailPasswordSignUp,
    sendPasswordResetEmail,
    submitNewPassword,
    thirdPartySignInAndUp,
    getAuthorisationURLWithQueryParamsAndSetState,
} from "supertokens-web-js/recipe/thirdpartyemailpassword";
import {sendVerificationEmail, verifyEmail} from "supertokens-web-js/recipe/emailverification";

import {
    IChangePasswordRequest, IChangePasswordResponse,
    ILoginEmailPasswordRequest,
    ISendEmailToResetPasswordRequest,
    ISignUpRequest,
    ISubmitNewPasswordRequest
} from "../interface";
import {CONFIG} from "../utils";
import {IServerErrorResponse} from "../interface/serverErrorResponse";

const baseQuery = fetchBaseQuery(({
    baseUrl: `${CONFIG.API_URL}/api`,
    // prepareHeaders: (headers) => {
    //     // const accessToken = localStorage.getItem("accessToken")
    //     // if (accessToken) {
    //     //     headers.set('Authorization', `Bearer ${accessToken}`)
    //     // }
    //     return headers
    // },
}))

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
        const refreshToken = localStorage.getItem('refreshToken')
        if (!refreshToken) {
            //   api.dispatch(logout())
        }
        const {data} = await baseQuery({
            url: '/auth/token/refresh',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${refreshToken}`,
            },
        }, api, extraOptions)
        // api.dispatch(saveTokens(data))
    }

    return result
}

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        signUpEmailPassword: (builder.mutation({
            queryFn: async (params: ISignUpRequest) => {
                const formattedParams = Object.entries(params).map(([key, value]) => ({
                    id: key,
                    value
                }))
                try {
                    const response = await emailPasswordSignUp({
                        formFields: formattedParams
                    })
                    if (response.status === "FIELD_ERROR") {
                        console.log(response.formFields)
                        console.log(response)
                        return {
                            error: {
                                status: 400,
                                data: {
                                    formFields: response.formFields,
                                    status: response.status,
                                }
                            }
                        }
                    }
                    return {data: response.user};
                } catch (e) {
                    console.log(e)
                    return {
                        error: {
                            status: 400,
                            data: 'Unexpected error'
                        }
                    };
                }
            },
        })),
        loginEmailPassword: builder.mutation({
            queryFn: async (params: ILoginEmailPasswordRequest) => {
                const response = await emailPasswordSignIn({
                    formFields: [{
                        id: "email",
                        value: params.email
                    }, {
                        id: "password",
                        value: params.password
                    }]
                })
                if (response.status === "FIELD_ERROR") {
                    return {
                        error: {
                            status: 400,
                            data: {
                                formFields: response.formFields,
                                status: response.status,
                            }
                        }
                    }
                }
                if (response.status === "WRONG_CREDENTIALS_ERROR") {
                    return {
                        error: {
                            status: 400,
                            error: 'Wrong credentials',
                        }
                    }
                }

                return {data: response.status};
            }
        }),
        sendEmailToResetPassword: builder.mutation({
            queryFn: async (params: ISendEmailToResetPasswordRequest) => {
                const response = await sendPasswordResetEmail({
                    formFields: [{
                        id: "email",
                        value: params.email
                    }]
                });
                return {data: response.status}
            }
        }),
        submitNewPassword: builder.mutation({
            queryFn: async (params: ISubmitNewPasswordRequest) => {
                const response = await submitNewPassword({
                    formFields: [{
                        id: "password",
                        value: params.password
                    }]
                })
                if (response.status === "FIELD_ERROR") {
                    return {
                        error: {
                            status: 400,
                            data: {
                                formFields: response.formFields,
                                status: response.status,
                            }
                        }
                    }
                }
                return {data: response.status}
            }
        }),
        sendVerificationEmail: builder.mutation({
            queryFn: async () => {
                const response = await sendVerificationEmail()
                return {data: response.status}
            }
        }),
        consumeVerificationCode: builder.mutation({
            queryFn: async () => {
                const response = await verifyEmail();
                return {data: response.status}
            }
        }),
        singInUpGoogle: builder.mutation({
            queryFn: async () => {
                const authUrl = await getAuthorisationURLWithQueryParamsAndSetState({
                    providerId: "google",
                    authorisationURL: `${CONFIG.WEB_URL}/auth/callback/google`,
                });
                return {
                    data: {
                        authUrl
                    }
                }
            }
        }),
        thirdPartySignInAndUp: builder.query({
            queryFn: async () => {
                const response = await thirdPartySignInAndUp();
                if (response.status === "OK") {
                    return {
                        data: {
                            status: response.status,
                            user: response.user
                        }
                    }
                } else if (response.status === "NO_EMAIL_GIVEN_BY_PROVIDER") {
                    return {
                        error: {
                            status: 400,
                            data: {
                                status: response.status,
                            }
                        }
                    }
                }
                return {
                    error: {
                        status: 'CUSTOM_ERROR',
                        error: 'Unexpected error',
                    }
                }
            }
        }),
        changePassword: builder.mutation<IServerErrorResponse | IChangePasswordResponse, IChangePasswordRequest>({
            query(body: IChangePasswordRequest) {
                return {
                    url: '/auth/change-password',
                    method: 'POST',
                    body: body,
                }
            },
        })
    }),
})

export const {
    useSignUpEmailPasswordMutation,
    useLoginEmailPasswordMutation,
    useSendEmailToResetPasswordMutation,
    useSubmitNewPasswordMutation,
    useSendVerificationEmailMutation,
    useConsumeVerificationCodeMutation,
    useSingInUpGoogleMutation,
    useThirdPartySignInAndUpQuery,
    useChangePasswordMutation
} = baseApi;

