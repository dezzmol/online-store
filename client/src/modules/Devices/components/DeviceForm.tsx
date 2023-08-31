import React, {FunctionComponent} from 'react';
import {IDevice} from "../types";
import {Card, Col, Divider, Rate} from "antd";
import {BASE_URL} from "../../AppRouter/utils/consts";
import Meta from "antd/es/card/Meta";
import {typeAPI} from "../api/typeAPI";
import {useNavigate} from "react-router-dom";
import {brandAPI} from "../api/brandAPI";

interface Props {
    device: IDevice;
}

const DeviceForm: FunctionComponent<Props> = ({device}) => {
    const {data: brand} = brandAPI.useGetOneTypeQuery(device.brandId)
    const navigate = useNavigate()
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
            onClick={() => navigate('/device/' + device.id)}
        >
            <Meta
                title={brand?.name + " " + device.name}
                description={'Price: ' + device.price + "$"}
            />
            <Divider />
            <Rate disabled={true} defaultValue={device.rating / 2} count={5} allowHalf={true}/>
        </Card>
    );
};

export default DeviceForm;