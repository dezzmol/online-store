import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_API_URL} from "../../AppRouter/utils/consts";
import {IType} from "../types";

export const typeAdminAPI = createApi({
    reducerPath: 'typeAdmin',
    baseQuery: fetchBaseQuery({baseUrl: BASE_API_URL + '/type'}),
    tagTypes: ['Types'],
    endpoints: (build) => ({
        getOneType: build.query<IType, number>({
            query: (id) => ({
                url: '/' + id
            })
        }),
        getAllTypes: build.query<IType[], void>({
            query: () => ({
                url: '/',
            }),
            providesTags: result => ['Types']
        }),
        createType: build.mutation<IType, {name: string, token: string | null}>({
            query: ({name, token}) => ({
                url: '/',
                method: "POST",
                body: {
                    name
                },
                headers: {
                    'authorization': 'Bearer ' + token
                }
            }),
            invalidatesTags: result => ['Types']
        }),
        editType: build.mutation<IType, {type: IType, token: string | null}>({
            query: ({type, token}) => ({
                url: '/edit',
                method: "POST",
                body: {
                    type
                },
                headers: {
                    "authorization": "Bearer " + token
                }
            }),
            invalidatesTags: result => ['Types']
        })
    })
})