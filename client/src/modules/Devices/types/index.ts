export interface IDevice {
    id: number;
    name: string;
    price: number;
    rating: number;
    img: string;
    typeId: number;
    brandId: number;
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
    name: string
}