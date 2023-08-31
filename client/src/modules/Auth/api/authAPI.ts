import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_API_URL} from "../../AppRouter/utils/consts";
import {IToken} from "../types";

export const authAPI = createApi({
    reducerPath: "user",
    baseQuery: fetchBaseQuery({baseUrl: BASE_API_URL + '/user'}),
    endpoints: (build) => ({
        registration: build.mutation<IToken, {email: string, password: string}>({
            query: (body) => ({
                url: '/registration',
                method: "POST",
                body,
            }),
        }),
        login: build.mutation<IToken, {email: string, password: string}>({
            query: (body) => ({
                url: '/login',
                method: "POST",
                body
            }),
        }),
        check: build.query<IToken, string | null>({
            query: (token) => ({
                url: '/auth',
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
        })
    })
})

export const {useCheckQuery} = authAPI