// eslint-disable-next-line import/named
import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from '@reduxjs/toolkit/query/react'
import {
    emailPasswordSignIn,
    emailPasswordSignUp,
    getAuthorisationURLWithQueryParamsAndSetState,
    sendPasswordResetEmail,
    submitNewPassword,
    thirdPartySignInAndUp,
} from "supertokens-web-js/recipe/thirdpartyemailpassword";
import {sendVerificationEmail, verifyEmail} from "supertokens-web-js/recipe/emailverification";

import {
    IChangePasswordRequest,
    IChangePasswordResponse,
    ICreateNewDiagramRequest,
    ICreateNewDiagramResponse,
    ICreateProjectRequest,
    IGetDiagramByIdResponse,
    IGetDiagramsByUserIdResponse,
    IGetDiagramTagsRequest,
    IGetDiagramTagsResponse, IGetProjectsRequest,
    IGetProjectsResponse,
    ILoginEmailPasswordRequest,
    ISendEmailToResetPasswordRequest,
    ISessionUserDataResponse,
    ISignUpRequest,
    ISubmitNewPasswordRequest,
    IUpdateDiagramRequest,
    IUpdateDiagramResponse,
    IUpdateUserDataRequest,
    IUpdateUserDataResponse
} from "../interface";
import {CONFIG} from "../utils";
import {IServerErrorResponse} from "../interface/serverErrorResponse";

import {ERTKTags} from "./requestTags";


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
        // const {data} = await baseQuery({
        //     url: '/auth/token/refresh',
        //     method: 'POST',
        //     headers: {
        //         'Authorization': `Bearer ${refreshToken}`,
        //     },
        // }, api, extraOptions)
        // api.dispatch(saveTokens(data))
    }

    return result
}

export const baseApi = createApi({
    tagTypes: [ERTKTags.User, ERTKTags.DiagramTags, ERTKTags.EditedDiagram, ERTKTags.PersonalDashboard, ERTKTags.Projects],
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
                    console.error(e)
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
        changePassword: builder.mutation<IChangePasswordResponse | IServerErrorResponse, IChangePasswordRequest>({
            query(body: IChangePasswordRequest) {
                return {
                    url: '/auth/change-password',
                    method: 'POST',
                    body: body,
                }
            },
            invalidatesTags: [ERTKTags.User]
        }),
        sessionUserData: builder.query<ISessionUserDataResponse, unknown>({
            query() {
                return {
                    url: '/user/session-user',
                    method: 'GET',
                }
            },
            providesTags: [ERTKTags.User]
        }),
        updateUserData: builder.mutation<IUpdateUserDataResponse, IUpdateUserDataRequest>({
            query(body: IUpdateUserDataRequest) {
                return {
                    url: '/user/update-session-user-data',
                    method: 'POST',
                    body: body,
                }
            },
            invalidatesTags: [ERTKTags.User]
        }),
        getDiagramTags: builder.query<{
            dashboardViewId: string
            tags: IGetDiagramTagsResponse
        }, IGetDiagramTagsRequest>({
            queryFn: async (body) => {
                const mockRes = [...Array(10)].map((_, index) => ({
                    name: `tag show page ${index} id:${body.dashboardViewId}`,
                    id: index.toString()
                }))
                return {
                    data: {
                        dashboardViewId: body.dashboardViewId,
                        tags: mockRes
                    }
                }
            },
            providesTags: (result, error, arg) => {
                return [{type: ERTKTags.DiagramTags, id: arg.dashboardViewId}]
            }
        }),
        createDiagram: builder.mutation<ICreateNewDiagramResponse, ICreateNewDiagramRequest>({
            query: (body: ICreateNewDiagramRequest) => {
                return {
                    url: '/diagram/create',
                    method: 'POST',
                    body: body,
                }
            },
            invalidatesTags: [ERTKTags.PersonalDashboard]
        }),
        getDiagramById: builder.query<IGetDiagramByIdResponse, string>({
            query: (id: string) => {
                return {
                    url: `/diagram?id=${id}`,
                    method: 'GET',
                }
            },
            providesTags: (result, error, diagramId) => {
                return [{type: ERTKTags.EditedDiagram, id: diagramId}]
            }
        }),
        updateDiagram: builder.mutation<IUpdateDiagramResponse, IUpdateDiagramRequest>({
            query: (body: IUpdateDiagramRequest) => {
                return {
                    url: '/diagram/update',
                    method: 'POST',
                    body: body
                }
            },
            invalidatesTags: (result, error, diagram) => {
                return [{type: ERTKTags.EditedDiagram, id: diagram.diagramId}, ERTKTags.PersonalDashboard]
            }
        }),
        getDiagramsByUserId: builder.query<IGetDiagramsByUserIdResponse, unknown>({
            query: () => {
                return {
                    url: '/diagram/own',
                    method: 'GET',
                }
            },
            providesTags: [ERTKTags.PersonalDashboard]
        }),
        deleteDiagram: builder.mutation({
            query: (id: string) => {
                return {
                    url: `/diagram?id=${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: [ERTKTags.PersonalDashboard]
        }),
        createProject: builder.mutation<unknown, ICreateProjectRequest>({
            query: (body: ICreateProjectRequest) => {
                return {
                    url: '/project',
                    method: 'POST',
                    body: body,
                }
            },
            invalidatesTags: [ERTKTags.Projects],
        }),
        getProjects: builder.query<IGetProjectsResponse, IGetProjectsRequest>({
            query: (body: IGetProjectsRequest) => {
                return {
                    url: '/project',
                    method: 'GET',
                    params: body,
                }
            },
            forceRefetch: ({ currentArg, previousArg }) => {
                return currentArg?.cursorId !== previousArg?.cursorId
            },
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName
            },
            merge: (currentCache, newItems) => {
                currentCache.push(...newItems)
            },
            providesTags: [ERTKTags.Projects, ERTKTags.User],
        }),
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
    useChangePasswordMutation,
    useSessionUserDataQuery,
    useUpdateUserDataMutation,
    useGetDiagramTagsQuery,
    useCreateDiagramMutation,
    useGetDiagramByIdQuery,
    useUpdateDiagramMutation,
    useGetDiagramsByUserIdQuery,
    useDeleteDiagramMutation,
    useCreateProjectMutation,
    useGetProjectsQuery,
} = baseApi;

