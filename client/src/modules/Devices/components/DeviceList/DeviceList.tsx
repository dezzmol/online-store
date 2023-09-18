import React, {FunctionComponent, useState} from 'react';
import {deviceAPI} from "../../api/deviceAPI";
import {Col, Grid, Row} from "antd";
import DeviceForm from '../DeviceForm';
import {LoadingOutlined} from "@ant-design/icons";
import DeviceFilter from "../DeviceFilter";
import classes from './DeviceList.module.css'

const DeviceList: FunctionComponent = () => {
    const [typeID, setTypeID] = useState<number | undefined>()
    const {data: devices, isLoading, isError, error} = deviceAPI.useGetAllDevicesQuery({typeId: typeID})


    if (isLoading) {
        return (
            <Row justify={"center"} align={"middle"} className={'h100'}>
                <LoadingOutlined/>
            </Row>
        )
    }

    if (isError) {
        return (
            <Row justify={"center"} align={"middle"} className={'h100'}>
                <>
                    {error}
                </>
            </Row>
        )
    }



    return (
        <div className={classes.container}>
            <DeviceFilter setType={setTypeID}/>
            <div className={classes.devices}>
                {devices && devices.rows.map(device =>
                    <DeviceForm key={device.id} device={device}/>
                )}
            </div>
        </div>
    );
};

export {DeviceList};