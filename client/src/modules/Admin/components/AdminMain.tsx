import React, {FunctionComponent, memo, useState} from 'react';
import {Button, Card} from "antd";
import classes from './AdminMain.module.css'
import AddTypeForm from './addTypes/AddTypeForm';
import AddBrandForm from "./addBrands/AddBrandForm";
import AddDeviceForm from "./addDevices/AddDeviceForm";

const AdminMain = memo(function Admin() {
    const [isCreatingMenuShow, setIsCreatingMenuShow] = useState<boolean>(false)
    const [content, setContent] = useState<number>(0) //0 - empty content, 1 - add type, 2 - add brand, 3 - add device

    const changeContent = (number: number) => {
        setIsCreatingMenuShow(true)
        setContent(number)
    }

    return (
        <div>
            <Card title={'Admin panel'}>
                <div className={classes.container}>
                    <Button onClick={() => changeContent(1)}>Add type</Button>
                    <Button onClick={() => changeContent(2)}>Add brand</Button>
                    <Button onClick={() => changeContent(3)}>Add device</Button>
                </div>
            </Card>
            {isCreatingMenuShow &&
                <Card>
                    <>
                        {content === 1 && <AddTypeForm/>}
                        {content === 2 && <AddBrandForm/>}
                        {content === 3 && <AddDeviceForm/>}
                    </>
                </Card>
            }
        </div>
    );
});

export default AdminMain;