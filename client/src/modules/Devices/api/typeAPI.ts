import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_API_URL} from "../../../utils/consts";
import {IType} from "../types";

export const typeAPI = createApi({
    reducerPath: 'type',
    baseQuery: fetchBaseQuery({baseUrl: BASE_API_URL + '/type'}),
    endpoints: (build) => ({
        getOneType: build.query<IType, number>({
            query: (id) => ({
                url: '/one',
                body: {
                    id: id
                }
            })
        })
    })
})