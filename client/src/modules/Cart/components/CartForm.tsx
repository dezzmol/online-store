import React, {FunctionComponent, useEffect, useState} from 'react';
import {cartAPI} from "../api/cartAPI";
import {Card, Row} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import CartDeviceForm from "./CartDeviceForm";
import {ICart, ICartDevice, IUniqueDevices} from "../types";

const CartForm: FunctionComponent = () => {
    const token = localStorage.getItem('token')
    const {data: cart, isLoading, isError} = cartAPI.useGetMyCartQuery(token)
    const [summary, setSummary] = useState<number>(0)
    const [updatedDevice, setUpdatedDevice] = useState<ICartDevice[]>([])


    useEffect(() => {
        setSummary(0)
        let finalSummary = 0;
        if (cart) {
            if (cart.devices) {
                let sorted = [...cart.devices].sort((a, b) => (a.id <= b.id ? 1 : -1))
                setUpdatedDevice(sorted)

                cart.devices.map(device => {
                    finalSummary += device.count * device.price
                })
            }
        }

        setSummary(finalSummary)
    }, [cart])

    if (isLoading) {
        return (
            <Row justify={"center"} align={"middle"} className={'h100'}>
                <LoadingOutlined/>
            </Row>
        )
    }

    if (isError) {
        return (
            <div>
                Error {isError}
            </div>
        )
    }


    return (
        <Card title={'Your cart'}>
            <div>
                {updatedDevice &&
                    updatedDevice.map(device =>
                        <CartDeviceForm key={device.id} deviceID={device.deviceId} deviceCount={device.count}/>
                    )
                }
            </div>
            <h2>Summary: {summary}$</h2>
        </Card>
    );
};

export {CartForm};