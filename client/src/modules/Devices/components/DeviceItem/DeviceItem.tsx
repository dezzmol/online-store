import React, {FunctionComponent} from 'react';
import {LoadingOutlined} from "@ant-design/icons";
import {Button, Card, Row} from "antd";
import {IDevice} from "../../types";
import {brandAPI} from "../../api/brandAPI";
import classes from "./DeviceItem.module.css"
import {BASE_URL} from "../../../AppRouter/utils/consts";
import {useAppSelector} from "../../../../hooks/useTyped";
import {useNavigate} from "react-router-dom";
import {cartAPI} from "../../../Cart";

interface Props {
    isLoading: boolean;
    device: IDevice;
}

const DeviceItem: FunctionComponent<Props> = ({device, isLoading}) => {
    const {data: brand} = brandAPI.useGetOneTypeQuery(device.brandId)
    const {isAuth} = useAppSelector(state => state.userReducer)
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [mutate] = cartAPI.useAddToCartMutation()

    if (isLoading) {
        return (
            <Row justify={"center"} align={"middle"} className={'h100'}>
                <LoadingOutlined/>
            </Row>
        )
    }

    const handleAddToCart = () => {
        mutate({deviceID: device.id, token})
    }

    return (
        <Card title={brand?.name + " " + device?.name}>
            <div className={classes.container}>
                <div className={classes.holder}>
                    <img
                        alt={'device img'}
                        src={BASE_URL + device?.img}
                        style={{
                            height: 'auto',
                            maxWidth: '250px',
                            padding: '20px 20px'
                        }}
                    />
                    <Card className={classes.addToCart}>
                        <div>
                            Brand: {brand?.name}
                        </div>
                        <div>
                            Model: {device?.name}
                        </div>
                        <h1>{device?.price}$</h1>
                        {isAuth ?
                            <Button onClick={() => handleAddToCart()}>Add to cart</Button>
                            :
                            <Button onClick={() => navigate('/login')}>LOGIN</Button>
                        }

                    </Card>
                </div>
            </div>
            <Card className={classes.container} style={{marginTop: '20px'}}>
                {device &&
                    device.info.map(info =>
                        <div className={classes.description}>
                            {info.title}
                            <div>
                                {info.desc}
                            </div>
                        </div>
                    )
                }
            </Card>
        </Card>
    );
};

export {DeviceItem};