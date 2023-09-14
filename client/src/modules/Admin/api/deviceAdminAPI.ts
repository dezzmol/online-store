import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_API_URL} from "../../AppRouter/utils/consts";
import {DeviceArray, IDevice, IDeviceParams} from "../../Devices/types";

export const deviceAdminAPI = createApi({
    reducerPath: "deviceAdmin",
    baseQuery: fetchBaseQuery({baseUrl: BASE_API_URL + '/device'}),
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

                return `/${params ? `?${new URLSearchParams(queryParams).toString()}` : ''}`
            },
            providesTags: result => ['device']
        }),
        getOneDevice: build.query<IDevice, string>({
            query: (id) => ({
                url: "/" + id,
                method: "GET"
            })
        }),
        editDevice: build.mutation<IDevice, { device: IDevice, token: string | null }>({
            query: ({device, token}) => ({
                url: "/edit",
                method: "POST",
                body: {
                    name: device.name,
                    id: device.id,
                    price: device.price
                },
                headers: {
                    'authorization': 'Bearer ' + token
                }
            }),
            invalidatesTags: result => ['device']
        })
    })
})