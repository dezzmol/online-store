import React, {FunctionComponent} from 'react';
import {cartAPI} from "../api/cartAPI";
import {Card, Row} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import {deviceAPI} from "../../Devices";

const CartForm: FunctionComponent = () => {
    const token = localStorage.getItem('token')
    const {data: cart, isLoading, isError} = cartAPI.useGetMyCartQuery(token)


    if (isLoading) {
        return (
            <Row justify={"center"} align={"middle"} className={'h100'}>
                <LoadingOutlined/>
            </Row>
        )
    }

    return (
        <Card title={'Your cart'}>

        </Card>
    );
};

export {CartForm};