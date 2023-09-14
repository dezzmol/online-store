import React, {memo, useState} from 'react';
import {IBrand, IType} from "../../types";
import {Button, Divider, Input, Modal} from "antd";
import classes from "../Form.module.css";
import {brandAdminAPI} from "../../api/brandAdminAPI";

interface Props {
    brand: IBrand;
}

const BrandItem = memo(({brand}: Props) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [mutate] = brandAdminAPI.useEditBrandMutation()
    const [brandNameText, setBrandNameText] = useState<string>(brand.name)
    const token = localStorage.getItem('token')

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        const Brand = {id: brand.id, name: brandNameText} as IBrand
        mutate({brand: Brand, token})
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div key={brand.id}>
            <Divider style={{marginTop: '0px', marginBottom: '10px'}}/>
            <div className={classes.grid_holder}>
                <div>
                    {brand.id}
                </div>
                <div>
                    {brand.name}
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
                    <p><Input value={brandNameText} onChange={(e) => setBrandNameText(e.target.value)}/></p>
                </Modal>
            </div>
        </div>
    );
});

export default BrandItem;