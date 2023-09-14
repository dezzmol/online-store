import React, {FunctionComponent, useState} from 'react';
import {typeAdminAPI} from "../../api/typeAdminAPI";
import {Button, Input} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import TypeList from "./TypeList";


const AddTypeForm: FunctionComponent = () => {
    const [mutate] = typeAdminAPI.useCreateTypeMutation()
    const {data: types, isLoading: isTypesLoading, isError: isTypesError} = typeAdminAPI.useGetAllTypesQuery()
    const [typeName, setTypeName] = useState<string>('')
    const token = localStorage.getItem('token')
    const addType = () => {
        mutate({name: typeName, token})
        setTypeName('')
    }

    if (isTypesLoading) {
        return (
            <div>
                <LoadingOutlined/>
            </div>
        )
    }

    if (isTypesError) {
        return (
            <div>
                {isTypesError}
            </div>
        )
    }

    return (
        <div>
            <h3>Enter type</h3>
            <Input placeholder={'Type name'} value={typeName} onChange={(e) => setTypeName(e.target.value)} width={'100px'}/>
            <Button onClick={() => addType()}>
                Add
            </Button>
            <div>
                {types && <TypeList types={types}/>}
            </div>
        </div>
    );
};

export default AddTypeForm;