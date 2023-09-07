import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_API_URL} from "../../AppRouter/utils/consts";
import {ICart, ICartDevice} from "../types";

export const cartAPI = createApi({
    reducerPath: "cartAPI",
    baseQuery: fetchBaseQuery({baseUrl: BASE_API_URL + '/cart'}),
    tagTypes: ['cart_devices'],
    endpoints: (build) => ({
        getMyCart: build.query<ICart, string | null>({
            query: (token) => ({
                url: '/myCart',
                headers: {
                    'authorization': `Bearer ${token}`
                }
            }),
            providesTags: result => ['cart_devices']
        }),
        removeFromCart: build.mutation<{status: string, message: string}, {token: string | null, deviceId: number}>({
            query: ({deviceId, token}) => ({
                url: '/removeFromCart',
                method: "POST",
                body: {
                    deviceId
                },
                headers: {
                    'authorization': `Bearer ${token}`
                }
            }),
            invalidatesTags: result => ['cart_devices']
        }),
        changeCount: build.mutation<ICartDevice, {deviceId: number | null, count: number, token: string | null}>({
            query: ({deviceId, count, token}) => ({
                url: '/changeCount',
                method: "POST",
                body: {
                    deviceId,
                    count
                },
                headers: {
                    'authorization': `Bearer ${token}`
                }
            }),
            invalidatesTags: result => ['cart_devices']
        }),
        addToCart: build.mutation<ICartDevice, {deviceID: number, token: string | null }>({
            query: ({deviceID, token}) => ({
                url: "/addToCart",
                method: "POST",
                body: {
                    deviceID
                },
                headers: {
                    'authorization': 'Bearer ' + token
                }
            }),
            invalidatesTags: result => ['cart_devices']
        })
    })
})