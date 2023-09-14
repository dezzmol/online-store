import React, {FunctionComponent} from 'react';
import {deviceAdminAPI} from "../../api/deviceAdminAPI";
import {LoadingOutlined} from "@ant-design/icons";
import {Button, Modal} from "antd";
import DeviceList from "./DeviceList";

const AddDeviceForm: FunctionComponent = () => {
    const {data: devices, isLoading, isError} = deviceAdminAPI.useGetAllDevicesQuery({typeId: undefined})

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

    return (
        <div>
            <h3>Add device</h3>
            <Button>Add</Button>
            {devices && devices.rows && <DeviceList devices={devices.rows}/>}
            <Modal

            >
                <p></p>
            </Modal>
        </div>
    );
};

export default AddDeviceForm;