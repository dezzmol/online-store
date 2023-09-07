export interface ICart {
    id: number;
    userId: number;
    devices: ICartDevice[];
}

export interface ICartDevice {
    id: number;
    cartId: number;
    deviceId: number;
    count: number;
    price: number;
}

export interface IUniqueDevices {
    deviceId: number;
    count: number;
    price: number;
}