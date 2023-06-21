// eslint-disable-next-line import/named
import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from '@reduxjs/toolkit/query/react'
import {emailPasswordSignUp} from "supertokens-web-js/recipe/thirdpartyemailpassword";

const baseQuery = fetchBaseQuery(({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
        const accessToken = localStorage.getItem("accessToken")
        if (accessToken) {
            headers.set('Authorization', `Bearer ${accessToken}`)
        }
        return headers
    },
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
            queryFn: async ({email, password}: { email: string, password: string }) => {
                try {
                    const response = await emailPasswordSignUp({
                        formFields: [{
                            id: "email",
                            value: email
                        }, {
                            id: "password",
                            value: password
                        }]
                    })
                    if (response.status === "FIELD_ERROR") {
                        return {
                            error: {
                                status: 400,
                                data: response.formFields
                            }
                        }
                    }
                    return {data: response.user};
                } catch (e) {
                    console.error(e)
                    return {
                        error:{
                            status: 400,
                            data: 'Unexpected error'
                        }
                    };
                }
            },
        })),
    }),
})

export const { useSignUpEmailPasswordMutation } = baseApi;

