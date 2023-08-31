export interface IDevice {
    id: number;
    name: string;
    price: number;
    rating: number;
    img: string;
    typeId: number;
    brandId: number;
    info: IDeviceInfo[]
}

export interface DeviceArray {
    count: number;
    rows: IDevice[]
}

interface IDeviceInfo {
    id: number;
    title: string;
    desc: string;
}

export interface IType {
    id: number;
    name: string
}

export interface IBrand {
    id: number;
    name: string;
}

export interface IDeviceParams {
    limit?: number;
    typeId?: number;

}