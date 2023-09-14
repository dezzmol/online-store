import React, {FunctionComponent} from 'react';
import {IDevice} from "../../../Devices";
import {Divider} from "antd";
import classes from "../Form.module.css";
import DeviceItem from "./DeviceItem";

interface Props {
    devices: IDevice[]
}

const DeviceList: FunctionComponent<Props> = ({devices}) => {
    return (
        <div>
            <Divider/>
            <div className={classes.container}>
                <div className={classes.grid_holder}>
                    <div>
                        Id
                    </div>
                    <div>
                        Name
                    </div>
                    <div style={{width: '77px'}}>
                        Edit
                    </div>
                </div>
                {devices.map(device =>
                    <DeviceItem device={device}/>
                )}
            </div>
        </div>
    );
};

export default DeviceList;