import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_API_URL} from "../../AppRouter/utils/consts";
import {IBrand} from "../types";

export const brandAPI = createApi({
    reducerPath: 'brand',
    baseQuery: fetchBaseQuery({baseUrl: BASE_API_URL + '/brand'}),
    endpoints: (build) => ({
        getOneType: build.query<IBrand, number>({
            query: (id) => ({
                url: '/' + id
            })
        }),
        getAllTypes: build.query<IBrand[], void>({
            query: () => ({
                url: '/',

            })
        })
    })
})