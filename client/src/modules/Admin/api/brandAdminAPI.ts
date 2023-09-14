import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_API_URL} from "../../AppRouter/utils/consts";
import {IBrand} from "../types";

export const brandAdminAPI = createApi({
    reducerPath: 'brandAdmin',
    baseQuery: fetchBaseQuery({baseUrl: BASE_API_URL + '/brand'}),
    tagTypes: ['Brands'],
    endpoints: (build) => ({
        getOneBrand: build.query<IBrand, number>({
            query: (id) => ({
                url: '/' + id
            })
        }),
        getAllBrands: build.query<IBrand[], void>({
            query: () => ({
                url: '/',
            }),
            providesTags: result => ['Brands']
        }),
        createBrand: build.mutation<IBrand, {name: string, token: string | null}>({
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
            invalidatesTags: result => ['Brands']
        }),
        editBrand: build.mutation<IBrand, {brand: IBrand, token: string | null}>({
            query: ({brand, token}) => ({
                url: '/edit',
                method: "POST",
                body: {
                    brand
                },
                headers: {
                    "authorization": "Bearer " + token
                }
            }),
            invalidatesTags: result => ['Brands']
        })
    })
})