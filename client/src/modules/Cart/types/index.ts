export interface ICart {
    id: number;
    userId: number;
}

export interface ICartDevice {
    id: number;
    cartId: number;
    deviceId: number;
}