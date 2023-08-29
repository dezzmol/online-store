import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_API_URL} from "../../../utils/consts";
import {DeviceArray, IDevice} from "../types";

const deviceAPI = createApi({
    reducerPath: 'device',
    baseQuery: fetchBaseQuery({baseUrl: BASE_API_URL }),
    endpoints: (build) => ({
        getAllDevices: build.query<DeviceArray, number>({
            query: (limit: number = 5) => ({
                url: "/device",
                params: {
                    _limit: limit
                },
            }),
        }),
        getOneDevice: build.query<IDevice, string>({
            query: (id) => ({
                url: "/device" + id,
            })
        })
    })
})

export {deviceAPI}