import React, {FunctionComponent, useState} from 'react';
import {deviceAPI} from "../../api/deviceAPI";
import {Col, Grid, Pagination, Row, Card} from "antd";
import DeviceForm from '../DeviceForm';
import {LoadingOutlined} from "@ant-design/icons";
import DeviceFilter from "../DeviceFilter";
import classes from './DeviceList.module.css'
import type { PaginationProps } from 'antd';

const DeviceList: FunctionComponent = () => {
    const [typeID, setTypeID] = useState<number | undefined>()
    const [countOnPage, setCountOnPage] = useState<number>(10)
    const [page, setPage] = useState<number>(1)
    const {data: devices, isLoading, isError, error} = deviceAPI.useGetAllDevicesQuery({typeId: typeID, limit: countOnPage, page})
    //const {data: devicesCount} = deviceAPI.useGetItemsCountQuery({typeId: typeID})
    

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
                    {isError}
                </>
            </Row>
        )
    }

    const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {  
        setPage(current)
        setCountOnPage(pageSize)
        console.log(current, pageSize);
    };

    return (
        <div className={classes.container}>
            <DeviceFilter setType={setTypeID}/>
            <div>
                <div className={classes.devices}>
                    {devices && devices.rows.map(device =>
                       <DeviceForm key={device.id} device={device}/>
                    )}
                </div>
                <div style={{display: 'flex', justifyContent: "center", paddingTop: '10px'}}>
                    <Pagination
                        showSizeChanger
                        total={devices?.count}
                        onShowSizeChange={onShowSizeChange}
                        current={page}
                        onChange={(current) => {setPage(current)}}
                    />
                </div>
            </div>
            
        </div>
    );
};

export {DeviceList};