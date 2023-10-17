// eslint-disable-next-line import/named
import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from '@reduxjs/toolkit/query/react'
import {
    emailPasswordSignIn,
    emailPasswordSignUp,
    getAuthorisationURLWithQueryParamsAndSetState,
    sendPasswordResetEmail,
    submitNewPassword,
    thirdPartySignInAndUp,
} from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import {sendVerificationEmail, verifyEmail} from "supertokens-auth-react/recipe/emailverification";

import {
    EUploadSpreadSheetRequestType,
    IAddDiagramLayerRequest,
    IChangePasswordRequest,
    IChangePasswordResponse,
    ICreateNewDiagramRequest,
    ICreateNewDiagramResponse,
    ICreateProjectRequest,
    ICreateProjectResponse,
    IDeleteProjectRequest,
    IGetAllGoogleSpreadsheetResponse,
    IGetDiagramByIdResponse,
    IGetDiagramByProjectIdRequest,
    IGetDiagramByProjectIdResponse,
    IGetDiagramSettingsRequest,
    IGetDiagramSettingsResponse,
    IGetDiagramTagsRequest,
    IGetDiagramTagsResponse,
    IGetManySpreadsheetRequests,
    IGetManySpreadsheetResponse,
    IGetProjectInfoRequest,
    IGetProjectInfoResponse,
    IGetProjectsRequest,
    IGetProjectsResponse,
    IGetProjectTeamMembersRequest,
    IGetProjectTeamMembersResponse,
    IGetSpreadsheetBaseInfoResponse,
    IGetSpreadsheetRequests,
    IGetSpreadsheetResponse,
    IGetSpreadsheetsBaseInfoRequests,
    IInviteUserToProjectRequest,
    ILeaveProjectTeamRequest,
    ILoginEmailPasswordRequest,
    ISendEmailToResetPasswordRequest,
    IServerErrorResponse,
    ISessionUserDataResponse,
    ISignUpRequest,
    ISubmitNewPasswordRequest,
    IUpdateExecutionGraphPropertiesRequest,
    IUpdateExecutionGraphPropertiesResponse,
    IUpdateUserDataRequest,
    IUpdateUserDataResponse,
    IUploadSpreadSheetRequest
} from "../interface";
import {CONFIG, getSocketAsync} from "../utils";

import {ERTKTags} from "./requestTags";
import moment from "moment";
import {EEventDiagramServer, EEventDiagramWeb} from "../constant";
import {GetDiagramsByProjectIdResponse} from "../interface/api/project/getDiagramsByProjectId";
import {IDeleteTeamMemberFromProjectTeamRequest} from "../interface/api/team/deleteTeamMember";
import {
    IGetExecutionGraphPropertiesRequest,
    IGetExecutionGraphPropertiesResponse
} from "../interface/api/executionGraph/getExecutionGraphProperties";


const baseQuery = fetchBaseQuery(({
    baseUrl: `${CONFIG.API_URL}/api`,
    // headers: (headers) => {
    //     return {
    //         ...headers,
    //         'ngrok-skip-browser-warning': true
    //     }
    // }
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
    tagTypes: [
        ERTKTags.User,
        ERTKTags.DiagramTags,
        ERTKTags.EditedDiagram,
        ERTKTags.PersonalDashboard,
        ERTKTags.Projects,
        ERTKTags.ProjectTeamMember,
        ERTKTags.Spreadsheet,
        ERTKTags.ExecutionGraph,
        ERTKTags.Diagrams,
        ERTKTags.DiagramSettings,
    ],
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
            invalidatesTags: [ERTKTags.User],
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
            },
            invalidatesTags: [ERTKTags.User],
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
            },
            invalidatesTags: [ERTKTags.User],
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
            },
            invalidatesTags: [ERTKTags.User],
        }),
        sendVerificationEmail: builder.mutation({
            queryFn: async () => {
                const response = await sendVerificationEmail()
                return {data: response.status}
            },
            invalidatesTags: [ERTKTags.User],
        }),
        consumeVerificationCode: builder.mutation({
            queryFn: async () => {
                const response = await verifyEmail();
                return {data: response.status}
            },
            invalidatesTags: [ERTKTags.User],
        }),
        singInUpGoogle: builder.mutation({
            queryFn: async () => {
                const authUrl = await getAuthorisationURLWithQueryParamsAndSetState({
                    thirdPartyId: 'google',
                    frontendRedirectURI: `${CONFIG.WEB_URL}/auth/callback/google`,
                    // providerId: "google",
                    // authorisationURL: `${CONFIG.WEB_URL}/auth/callback/google`,
                });
                return {
                    data: {
                        authUrl
                    }
                }
            },
            invalidatesTags: [ERTKTags.User],
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
            invalidatesTags: [ERTKTags.Diagrams]
        }),
        deleteDiagram: builder.mutation({
            query: (id: string) => {
                return {
                    url: `/diagram?id=${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: [ERTKTags.Diagrams]
        }),
        createProject: builder.mutation<ICreateProjectResponse, ICreateProjectRequest>({
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
            forceRefetch: ({currentArg, previousArg}) => {
                return currentArg?.cursorId !== previousArg?.cursorId
            },
            serializeQueryArgs: ({endpointName}) => {
                return endpointName
            },
            merge: (currentCache, newItems) => {
                const filteredItems = newItems.filter((newItem) => {
                    return !currentCache.some((currentItem) => {
                        return currentItem.id === newItem.id
                    })
                })
                currentCache.push(...filteredItems)
                return currentCache
                    .sort((a, b) => {
                        return moment(b.updatedAt).diff(moment(a.updatedAt))
                    })
            },
            providesTags: [ERTKTags.Projects, ERTKTags.User],
        }),
        getProjectDiagrams: builder.query<IGetDiagramByProjectIdResponse, IGetDiagramByProjectIdRequest>({
            query: (body: IGetDiagramByProjectIdRequest) => {
                return {
                    url: `/project/${body.projectId}/diagrams`,
                    method: 'GET',
                    params: body,
                }
            },
            forceRefetch: ({currentArg, previousArg}) => {
                return currentArg?.cursorId !== previousArg?.cursorId || currentArg?.projectId !== previousArg?.projectId
            },
            serializeQueryArgs: ({endpointName}) => {
                return endpointName
            },
            merge: (currentCache, newRequest) => {
                if (currentCache.id === undefined || currentCache.id !== newRequest.id) {
                    return newRequest
                }
                const filteredItems = newRequest.diagrams.filter((newItem) => {
                    return !currentCache.diagrams.some((currentItem) => {
                        return currentItem.id === newItem.id
                    })
                })
                const diagrams = [...currentCache.diagrams, ...filteredItems]
                const sortedDiagrams = diagrams
                    .sort((a, b) => {
                        return moment(b.updatedAt).diff(moment(a.updatedAt))
                    })
                return {
                    ...currentCache,
                    diagrams: [...sortedDiagrams]
                }
            },
            providesTags: [ERTKTags.Diagrams],
        }),
        getDiagramsByProjectId: builder.query<GetDiagramsByProjectIdResponse, string>({
            query: (projectId: string) => {
                return {
                    url: `/project/diagrams/${projectId}`,
                    method: 'GET',
                }
            }
        }),

        getDiagramById: builder.query<{
            diagram?: IGetDiagramByIdResponse
        }, string | undefined>({
            queryFn: async (diagramId: string) => {
                const socket = await getSocketAsync();
                socket.emit(EEventDiagramServer.JoinDiagramRoom, diagramId);
                socket.emit(EEventDiagramServer.RequestDiagram, diagramId);
                return {
                    data: {}
                }
            },
            async onCacheEntryAdded(
                diagramId,
                {cacheDataLoaded, cacheEntryRemoved, updateCachedData},
            ) {
                try {
                    await cacheDataLoaded;

                    const socket = await getSocketAsync();


                    socket.on(EEventDiagramWeb.UpdateDiagramElements, (content: IGetDiagramByIdResponse) => {
                        updateCachedData((draft) => {
                            draft = {
                                diagram: {
                                    id: content.id,
                                    name: content.name,
                                    elements: content.elements,
                                },
                            };
                            return draft
                        });
                    });
                    await cacheEntryRemoved;
                    socket.off('connect');
                    socket.off(EEventDiagramServer.RequestDiagram);
                    socket.off(EEventDiagramWeb.UpdateDiagramElements);
                } catch {
                    // if cacheEntryRemoved resolved before cacheDataLoaded,
                    // cacheDataLoaded throws
                }
            },
        }),
        updateDiagramElements: builder.mutation<{
            diagramId: string,
            elements: JSON
        }, unknown>({
            queryFn: async (chatMessageContent: string) => {
                const socket = await getSocketAsync();
                return new Promise(() => {
                    socket.emit(EEventDiagramServer.UpdateDiagramElements, chatMessageContent);
                })
            },
        }),
        inviteUserToProject: builder.mutation<unknown, IInviteUserToProjectRequest>({
            query: (body: IInviteUserToProjectRequest) => {
                return {
                    url: '/project/invite',
                    method: 'POST',
                    body: body
                }
            },
            invalidatesTags: [ERTKTags.ProjectTeamMember]
        }),
        getProjectTeamMembers: builder.query<IGetProjectTeamMembersResponse, IGetProjectTeamMembersRequest>({
            query: (params: IGetProjectTeamMembersRequest) => {
                return {
                    url: `/project/team-members`,
                    method: 'GET',
                    params: params,
                }
            },
            providesTags: [ERTKTags.ProjectTeamMember]
        }),
        deleteTeamMemberFromProjectTeam: builder.mutation<unknown, IDeleteTeamMemberFromProjectTeamRequest>({
            query: (params: IDeleteTeamMemberFromProjectTeamRequest) => {
                return {
                    url: `/team/member/${params.teamMemberId}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: [ERTKTags.ProjectTeamMember]
        }),
        leaveProjectTeam: builder.mutation<unknown, ILeaveProjectTeamRequest>({
            query: (params: ILeaveProjectTeamRequest) => {
                return {
                    url: `/team/leave`,
                    method: 'DELETE',
                    body: params,
                }
            },
            invalidatesTags: [ERTKTags.ProjectTeamMember]
        }),
        deleteProject: builder.mutation<unknown, IDeleteProjectRequest>({
            query: (params: IDeleteProjectRequest) => {
                return {
                    url: `/project/${params.projectId}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: [ERTKTags.Projects]
        }),
        getProjectInfo: builder.query<IGetProjectInfoResponse, IGetProjectInfoRequest>({
            query: (params: IGetProjectInfoRequest) => {
                return {
                    url: `/project/info`,
                    method: 'GET',
                    params: params,
                }
            },
            providesTags: (result, error, arg) => {
                return [{type: ERTKTags.Projects, id: arg?.projectId}]
            }
        }),
        uploadSpreadSheet: builder.mutation<unknown, IUploadSpreadSheetRequest>({
            query: (params: IUploadSpreadSheetRequest) => {
                if (params.type === EUploadSpreadSheetRequestType.File) {
                    const formData = new FormData();
                    formData.append('file', params.file);
                    formData.append('projectId', params.projectId);
                    return {
                        url: `/project/spreadsheet/upload`,
                        method: 'POST',
                        body: formData,
                        formData: true
                    }
                }
                return {
                    url: `/project/spreadsheet/upload`,
                    method: 'POST',
                    body: {
                        projectId: params.projectId,
                        googleSpreadsheetId: params.googleSpreadsheetId,
                    },
                }
            },
            invalidatesTags: [ERTKTags.Spreadsheet]
        }),
        getSpreadSheetsBaseInfo: builder.query<IGetSpreadsheetBaseInfoResponse, IGetSpreadsheetsBaseInfoRequests>({
            query: (params: IGetSpreadsheetsBaseInfoRequests) => {
                return {
                    url: `/project/spreadsheets/base-info`,
                    method: 'GET',
                    params: params,
                }
            },
            providesTags: (result, error, arg) => {
                return [{type: ERTKTags.Spreadsheet, id: arg?.projectId}]
            }
        }),
        getSpreadSheet: builder.query<IGetSpreadsheetResponse, IGetSpreadsheetRequests>({
            query: (params: IGetSpreadsheetRequests) => {
                return {
                    url: `/project/spreadsheet`,
                    method: 'GET',
                    params: params,
                }
            },
            providesTags: (result, error, arg) => {
                return [{type: ERTKTags.Spreadsheet, id: arg?.spreadsheetId}]
            }
        }),
        getManySpreadsheet: builder.query<IGetManySpreadsheetResponse, IGetManySpreadsheetRequests>({
            query: (params: IGetManySpreadsheetRequests) => {
                return {
                    url: `/project/spreadsheets`,
                    method: 'GET',
                    params: params,
                }
            },
            providesTags: (result, error, arg) => {
                return [{type: ERTKTags.Spreadsheet, id: arg?.spreadsheetIds?.join('')}]
            }
        }),
        useDeleteSpreadsheet: builder.mutation<unknown, string>({
            query: (spreadsheetId: string) => {
                return {
                    url: `/project/spreadsheet/${spreadsheetId}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: [ERTKTags.Spreadsheet]
        }),
        updateSpreadsheet: builder.mutation<unknown, string>({
            query: (spreadsheetId: string) => {
                return {
                    url: `/project/spreadsheet/${spreadsheetId}`,
                    method: 'PUT',
                }
            },
            invalidatesTags: [ERTKTags.Spreadsheet]
        }),
        getAllUserGoogleSpreadSheet: builder.query<IGetAllGoogleSpreadsheetResponse, undefined>({
            query: () => {
                return {
                    url: `/spreadsheet/google-spreadsheets`,
                    method: 'GET',
                }
            }
        }),
        updateExecutionGraphProperties: builder.mutation<IUpdateExecutionGraphPropertiesResponse, IUpdateExecutionGraphPropertiesRequest>({
            query: (params: IUpdateExecutionGraphPropertiesRequest) => {
                return {
                    url: `/diagram/update/execution-graph`,
                    method: 'PUT',
                    body: params,
                }
            },
            invalidatesTags: [ERTKTags.ExecutionGraph]
        }),
        getExecutionGraphProperties: builder.query<IGetExecutionGraphPropertiesResponse, IGetExecutionGraphPropertiesRequest>({
            query: (params: IGetExecutionGraphPropertiesRequest) => {
                return {
                    url: `/diagram/execution-graph`,
                    method: 'GET',
                    params: params,
                }
            },
            providesTags: [ERTKTags.ExecutionGraph]
        }),
        addDiagramLayer: builder.mutation<unknown, IAddDiagramLayerRequest>({
            query: (params: IAddDiagramLayerRequest) => {
                return {
                    url: `/diagram/layers/update`,
                    method: 'PUT',
                    body: params,
                }
            },
            invalidatesTags: [ERTKTags.DiagramSettings],
        }),
        getDiagramSettings: builder.query<IGetDiagramSettingsResponse, IGetDiagramSettingsRequest>({
            query: (params: IGetDiagramSettingsRequest) => {
                return {
                    url: `/diagram/settings`,
                    method: 'GET',
                    params: params,
                }
            },
            providesTags: [ERTKTags.DiagramSettings, ERTKTags.EditedDiagram],
        }),
        deleteLayer: builder.mutation<unknown, string>({
            query: (layerId: string) => {
                return {
                    url: `/diagram/layers/delete/${layerId}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: [ERTKTags.DiagramSettings],
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
    useChangePasswordMutation,
    useSessionUserDataQuery,
    useLazySessionUserDataQuery,
    useUpdateUserDataMutation,
    useGetDiagramTagsQuery,
    useCreateDiagramMutation,
    // useGetDiagramByIdQuery,
    // useUpdateDiagramMutation,
    // useGetDiagramsByUserIdQuery,
    useDeleteDiagramMutation,
    useCreateProjectMutation,
    useGetProjectsQuery,
    useGetDiagramsByProjectIdQuery,
    useUpdateDiagramElementsMutation,
    useGetDiagramByIdQuery,
    useInviteUserToProjectMutation,
    useGetProjectTeamMembersQuery,
    useDeleteProjectMutation,
    useGetProjectInfoQuery,
    useDeleteTeamMemberFromProjectTeamMutation,
    useLeaveProjectTeamMutation,
    useUploadSpreadSheetMutation,
    useGetSpreadSheetsBaseInfoQuery,
    useGetSpreadSheetQuery,
    useGetAllUserGoogleSpreadSheetQuery,
    useGetManySpreadsheetQuery,
    useUseDeleteSpreadsheetMutation,
    useUpdateExecutionGraphPropertiesMutation,
    useGetExecutionGraphPropertiesQuery,
    useGetProjectDiagramsQuery,
    useAddDiagramLayerMutation,
    useGetDiagramSettingsQuery,
    useDeleteLayerMutation,
    useUpdateSpreadsheetMutation
} = baseApi;

