import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_API_URL} from "../../AppRouter/utils/consts";
import {DeviceArray, IDevice, IDeviceParams} from "../types";


const deviceAPI = createApi({
    reducerPath: 'deviceAPI',
    baseQuery: fetchBaseQuery({baseUrl: BASE_API_URL }),
    tagTypes: ['device'],
    endpoints: (build) => ({
        getAllDevices: build.query<DeviceArray, IDeviceParams>({
            query: (params) => {
                const queryParams = new URLSearchParams();
                if (params.typeId) queryParams.set('typeId', params.typeId.toString());
                if (params.limit) {
                    queryParams.set('limit', params.limit.toString())
                } else {
                    queryParams.set('limit', '10')
                }

                return `/device${params ? `?${new URLSearchParams(queryParams).toString()}` : ''}`
            },
            providesTags: result => ['device']
        }),
        getOneDevice: build.query<IDevice, string>({
            query: (id) => ({
                url: "/device/" + id,
                method: "GET"
            })
        })
    })
})

export {deviceAPI}