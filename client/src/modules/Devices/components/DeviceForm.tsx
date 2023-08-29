import React, {FunctionComponent} from 'react';
import {IDevice} from "../types";
import {Card, Col} from "antd";
import {BASE_URL} from "../../../utils/consts";
import Meta from "antd/es/card/Meta";
import {typeAPI} from "../api/typeAPI";

interface Props {
    device: IDevice;
}

const DeviceForm: FunctionComponent<Props> = ({device}) => {
    const {data: typeName} = typeAPI.useGetOneTypeQuery(device.typeId)
    console.log(typeName)
    return (
        <Card
            style={{width: '300px' }}
            cover={
            <img
                alt='pic'
                src={BASE_URL + device.img}
                width={'100%'}
                style={{padding: '30px 30px'}}
            />}
            hoverable={true}
        >
            <Meta
                title={typeName?.name + device.name}
                description={'Price: ' + device.price + "$"}
            />
        </Card>
    );
};

export default DeviceForm;