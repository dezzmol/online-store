import React, {FunctionComponent, useState} from 'react';
import {Button, Card, Modal} from "antd";
import {deviceAPI} from "../../Devices";
import {BASE_URL} from "../../AppRouter/utils/consts";
import classes from "./CartDeviceForm.module.css"
import CartItemCount from "./CartItemCount";
import {cartAPI} from "../api/cartAPI";

interface Props {
    deviceID: number;
    deviceCount: number;
}

const CartDeviceForm: FunctionComponent<Props> = ({deviceID, deviceCount}) => {
    const {data: device} = deviceAPI.useGetOneDeviceQuery(deviceID.toString())
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mutate] = cartAPI.useRemoveFromCartMutation()
    const token = localStorage.getItem('token')

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        mutate({deviceId: deviceID, token})
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Card className={classes.card}>
            <div className={classes.holder}>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <img
                        alt={'img'}
                        src={BASE_URL + device?.img}
                        style={{
                            height: 'auto',
                            maxWidth: '60%',
                            padding: '20px 20px',
                        }}
                    />
                </div>
                <div style={{ textAlign: "center"}}>
                    <h3>{device?.name}</h3>
                    <h2>{device?.price}$</h2>
                </div>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <CartItemCount count={deviceCount} deviceId={deviceID}/>
                </div>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Button onClick={() => showModal()}>Delete from cart</Button>
                </div>
            </div>
            <Modal title={"Are you sure to delete this device?"} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

            </Modal>
        </Card>
    );
};

export default CartDeviceForm;