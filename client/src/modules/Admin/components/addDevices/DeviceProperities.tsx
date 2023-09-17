import React, {Dispatch, FunctionComponent, useState, ChangeEvent} from 'react';
import {Input, InputNumber, Modal, Select, UploadFile} from "antd";
import {typeAdminAPI} from "../../api/typeAdminAPI";
import {brandAdminAPI} from "../../api/brandAdminAPI";
import {toSelectType} from "../../helpers/toSelectType";
import Dragger from 'antd/es/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';
import { deviceAdminAPI } from '../../api/deviceAdminAPI';
import { IBrand, ICreatingDevice, IType } from '../../types';


interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<React.SetStateAction<boolean>>
}

const DeviceProperties: FunctionComponent<Props> = ({isOpen, setIsOpen}) => {
    const [deviceNameText, setDeviceNameText] = useState<string>('')
    const [devicePrice, setDevicePrice] = useState<number>(0)
    const {data: allTypes} = typeAdminAPI.useGetAllTypesQuery()
    const {data: allBrands} = brandAdminAPI.useGetAllBrandsQuery()
    const [selectTypes, setSelectTypes] = useState<{label: string; value: string}[]>([])
    const [selectBrands, setSelectBrands] = useState<{label: string; value: string}[]>([])
    const [selectedType, setSelectedType] = useState<string>('')
    const [selectedBrand, setSelectedBrand] = useState<string>('')
    const [img, setImg] = useState<File>()
    const [createDevice] = deviceAdminAPI.useCreateDeviceMutation()
    const token = localStorage.getItem('token')

    const convertTypes = () => {
        setSelectTypes(toSelectType(allTypes))
        setSelectBrands(toSelectType(allBrands))
    }

    const getBrandId = (brands: IBrand[] | undefined, brandName: string) => {
        if (brands) {
            const item = brands.find((brand) => brand.name === brandName)
            if (item) {
                return item.id
            }
        }
        return 0
    }

    const getTypeId = (types: IType[] | undefined, typeName: string) => {
        if (types) {
            const item = types.find((type) => type.name === typeName)
            if (item) {
                return item.id
            }
        }
        return 0
    }

    const toDevice = () => {
        let typeId = getTypeId(allTypes, selectedType)
        let brandId = getBrandId(allBrands, selectedBrand)
        const device: ICreatingDevice = {
            name: deviceNameText,
            price: devicePrice,
            brandID: brandId,
            typeID: typeId
        }

        return device
    }

    const handleOk = () => {
        const device = toDevice()
        if (img) {
            createDevice({device, file: img, token})
        }
        setIsOpen(false);
        
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          setImg(e.target.files[0]);
        }
      };

    return (
        <Modal
            open={isOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            title={'Add'}
        >
            <p>
                <Select style={{width: "100%"}} title={'Type'} onClick={() => convertTypes()} value={selectedType} options={selectTypes} onChange={(e) => setSelectedType(e)}/>
                <Select style={{width: "100%"}} title={'Brand'} onClick={() => convertTypes()} value={selectedBrand} options={selectBrands} onChange={(e) => setSelectedBrand(e)}/>
                <Input placeholder={'Device name'} value={deviceNameText} onChange={(e) => setDeviceNameText(e.target.value)}/>
                <InputNumber placeholder={'Device price'} addonAfter="$" value={devicePrice} onChange={(e) => setDevicePrice(e!)}/>
                {/* <Dragger 
                    name='Device image'
                    beforeUpload={() => false}
                    onChange={(info) => setImg(info.file)}
                >
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                    Click or drag file to this area to upload a device's image
                </p>
                </Dragger> */}
                <Input type='file' accept="image/png, image/jpeg" onChange={handleFileChange}/>
            </p>
        </Modal>
    );
};

export default DeviceProperties;