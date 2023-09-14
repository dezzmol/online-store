import React, {FunctionComponent, useState} from 'react';
import {Button, Input} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import BrandsList from "./BrandsList";
import {brandAdminAPI} from "../../api/brandAdminAPI";


const AddBrandForm: FunctionComponent = () => {
    const [mutate] = brandAdminAPI.useCreateBrandMutation()
    const {data: brands, isLoading: isBrandsLoading, isError: isBrandsError} = brandAdminAPI.useGetAllBrandsQuery()
    const [brandName, setBrandName] = useState<string>('')
    const token = localStorage.getItem('token')
    const addBrand = () => {
        mutate({name: brandName, token})
        setBrandName('')
    }

    if (isBrandsLoading) {
        return (
            <div>
                <LoadingOutlined/>
            </div>
        )
    }

    if (isBrandsError) {
        return (
            <div>
                {isBrandsError}
            </div>
        )
    }

    return (
        <div>
            <h3>Enter brand</h3>
            <Input placeholder={'Brand name'} value={brandName} onChange={(e) => setBrandName(e.target.value)} width={'100px'}/>
            <Button onClick={() => addBrand()}>
                Add
            </Button>
            <div>
                {brands && <BrandsList brands={brands}/>}
            </div>
        </div>
    );
};

export default AddBrandForm;