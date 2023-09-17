import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_API_URL} from "../../AppRouter/utils/consts";
import {DeviceArray, ICreatingDevice, IDevice, IDeviceParams} from "../types";

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
        }),
        createDevice: build.mutation<IDevice, {device: ICreatingDevice, file: File, token: string | null}>({
            query: ({device, file, token}) => {
                let bodyFormData = new FormData()
                bodyFormData.append('name', device.name)
                bodyFormData.append('price', device.price.toString())
                bodyFormData.append('typeID', device.typeID.toString())
                bodyFormData.append('brandID', device.brandID.toString())
                bodyFormData.append('img', file)
                if (device.info) {
                    bodyFormData.append('info', JSON.stringify(device.info))
                }
                return {
                    url: "/",
                    method: "POST",
                    body: bodyFormData,
                    headers: {
                        'authorization': 'Bearer ' + token
                    },
                    formData: true
                }
            },
            invalidatesTags: result => ['device']
        })
    })
})