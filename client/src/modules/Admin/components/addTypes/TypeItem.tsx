import React, {FunctionComponent, memo, useState} from 'react';
import {Button, Divider, Input, Modal} from "antd";
import classes from "../Form.module.css";
import {IType} from "../../types";
import {typeAdminAPI} from "../../api/typeAdminAPI";

interface Props {
    type: IType;
}

const TypeItem: FunctionComponent<Props> = memo(({type}) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [mutate] = typeAdminAPI.useEditTypeMutation()
    const [typeInputText, setTypeInputText] = useState<string>(type.name)
    const token = localStorage.getItem('token')

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        const Type = {id: type.id, name: typeInputText} as IType
        mutate({type: Type, token})
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div key={type.id}>
            <Divider style={{marginTop: '0px', marginBottom: '10px'}}/>
            <div className={classes.grid_holder}>
                <div>
                    {type.id}
                </div>
                <div>
                    {type.name}
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
                    <p><Input value={typeInputText} onChange={(e) => setTypeInputText(e.target.value)}/></p>
                </Modal>
            </div>
        </div>
    );
});

export default TypeItem;