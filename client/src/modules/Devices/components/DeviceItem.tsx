import React, {FunctionComponent} from 'react';
import {useParams} from "react-router-dom";
import {deviceAPI} from "../api/deviceAPI";
import {LoadingOutlined} from "@ant-design/icons";
import {Row} from "antd";

const DeviceItem: FunctionComponent = () => {
    const params = useParams()
    const {data, isLoading, isError} = deviceAPI.useGetOneDeviceQuery(params.id!)

    if (isLoading) {
        return (
            <Row justify={"center"} align={"middle"} className={'h100'}>
                <LoadingOutlined/>
            </Row>
        )
    }

    return (
        <div>

        </div>
    );
};

export default DeviceItem;