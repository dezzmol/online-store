import React, {FunctionComponent, useState} from 'react';
import {InputNumber} from "antd";
import {cartAPI} from "../api/cartAPI";

interface Props {
    count: number;
    deviceId: number | null;
}

const CartItemCount: FunctionComponent<Props> = ({deviceId, count}) => {
    const token = localStorage.getItem('token')
    const [mutate] = cartAPI.useChangeCountMutation()
    const [newCount, setNewCount] = useState<number>(count)

    const handleChange = (inputCount: number | null) => {
        if (inputCount) {
            setNewCount(inputCount)
            mutate({deviceId, count: inputCount, token})
        }
    }




    return (
        <InputNumber min={1} max={10} defaultValue={newCount} onChange={(e) => handleChange(e)}/>
    );
};

export default CartItemCount;