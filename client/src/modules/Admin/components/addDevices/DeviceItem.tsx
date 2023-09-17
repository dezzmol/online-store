import React, {FunctionComponent, useState} from 'react';
import {IDevice} from "../../../Devices";
import {Button, Divider, Input, Modal} from "antd";
import classes from "../Form.module.css";
import {deviceAdminAPI} from "../../api/deviceAdminAPI";
import {typeAdminAPI} from "../../api/typeAdminAPI";
import {brandAdminAPI} from "../../api/brandAdminAPI";

interface Props {
    device: IDevice
}

const DeviceItem: FunctionComponent<Props> = ({device}) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [mutate] = deviceAdminAPI.useEditDeviceMutation()
    const [deviceNameText, setDeviceNameText] = useState<string>(device.name)
    const token = localStorage.getItem('token')
    const {data: BrandData} = brandAdminAPI.useGetOneBrandQuery(device.brandId)

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        const Device = {id: device.id, name: deviceNameText} as IDevice
        mutate({device: Device, token})
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <Divider style={{marginTop: '0px', marginBottom: '10px'}}/>
            <div className={classes.grid_holder}>
                <div>
                    {device.id}
                </div>
                <div>
                    {BrandData?.name} {device.name}
                </div>
                <div style={{width: '77px'}}>
                    <Button onClick={() => showModal()}>
                        Edit
                    </Button>
                </div>
                <Modal
                    title={'Edit'}
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <p><Input value={deviceNameText} onChange={(e) => setDeviceNameText(e.target.value)}/></p>
                </Modal>
            </div>
        </div>
    );
};

export default DeviceItem;