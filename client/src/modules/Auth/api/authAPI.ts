import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_API_URL} from "../../../utils/consts";
import {IToken, IUser} from "../helpers";

export const authAPI = createApi({
    reducerPath: "/user",
    baseQuery: fetchBaseQuery({baseUrl: BASE_API_URL}),
    tagTypes: ['User'],
    endpoints: (build) => ({
        registration: build.mutation<IUser, IToken>({
            query: (body) => ({
                url: '/registration',
                method: "POST",
                body: body,
            }),
            invalidatesTags: ['User']
        }),
        login: build.mutation<IUser, IToken>({
            query: (body) => ({
                url: '/login',
                method: "POST",
                body: body
            }),
            invalidatesTags: ['User']
        })

    })
})