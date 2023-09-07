import React, {FunctionComponent, lazy, Suspense} from 'react';
import {deviceAPI} from "../modules/Devices";
import {useParams} from "react-router-dom";
import classes from '../styles/pages.module.css'
import {LoadingOutlined} from "@ant-design/icons";

const DevicePage: FunctionComponent = () => {
    const params = useParams()
    const {id} = params
    const {data: device, isLoading, isError} = deviceAPI.useGetOneDeviceQuery(id!.toString())

    const DeviceItem = lazy(() => import('../modules/Devices'))

    return (
        <div className={classes.page}>
            <Suspense fallback={<LoadingOutlined/>}>
                {device &&
                    <DeviceItem device={device} isLoading={isLoading}/>
                }
            </Suspense>
        </div>
    );
};

export default DevicePage;