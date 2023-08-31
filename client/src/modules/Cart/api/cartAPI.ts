import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_API_URL} from "../../AppRouter/utils/consts";
import {ICart} from "../types";

export const cartAPI = createApi({
    reducerPath: "cartAPI",
    baseQuery: fetchBaseQuery({baseUrl: BASE_API_URL + '/cart'}),
    endpoints: (build) => ({
        getMyCart: build.query<ICart, string | null>({
            query: (token) => ({
                url: '/myCart',
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
        })
    })
})