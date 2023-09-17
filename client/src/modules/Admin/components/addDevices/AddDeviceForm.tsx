import React, {FunctionComponent, useState} from 'react';
import {deviceAdminAPI} from "../../api/deviceAdminAPI";
import {LoadingOutlined} from "@ant-design/icons";
import {Button, Input, Modal} from "antd";
import DeviceList from "./DeviceList";
import {IDevice} from "../../../Devices";
import DeviceProperties from "./DeviceProperities";

const AddDeviceForm: FunctionComponent = () => {
    const {data: devices, isLoading, isError} = deviceAdminAPI.useGetAllDevicesQuery({typeId: undefined})
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    if (isLoading) {
        return (
            <div>
                <LoadingOutlined/>
            </div>
        )
    }

    if (isError) {
        return (
            <div>
                {isError}
            </div>
        )
    }

    const showModal = () => {
        setIsModalOpen(true);
    };


    return (
        <div>
            <h3>Add device</h3>
            <Button onClick={() => showModal()}>Add</Button>
            {devices && devices.rows && <DeviceList devices={devices.rows}/>}
            <DeviceProperties isOpen={isModalOpen} setIsOpen={setIsModalOpen}/>
        </div>
    );
};

export default AddDeviceForm;