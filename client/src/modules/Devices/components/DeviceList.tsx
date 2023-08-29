import React, {FunctionComponent} from 'react';
import {deviceAPI} from "../api/deviceAPI";
import {Col, Grid, Row} from "antd";
import DeviceForm from './DeviceForm';
import {LoadingOutlined} from "@ant-design/icons";

const DeviceList: FunctionComponent = () => {
    const {data: devices, isLoading, isError} = deviceAPI.useGetAllDevicesQuery(5)

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
                {isError}
            </Row>
        )
    }

    return (
        <div style={{display: "grid",
            gridTemplateColumns: 'repeat(auto-fill, 300px)',
            maxWidth: '950px',
            gridColumnGap: '20px',
            gridRowGap: '20px'
        }}>
            {devices && devices.rows.map(device =>
                <DeviceForm key={device.id} device={device}/>
            )}
        </div>
    );
};

export {DeviceList};