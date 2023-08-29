export interface IToken {
    token: string
}

export interface IUser {
    email: string;
    password: string;
}

export interface IRegData {
    email: string;
    password: string;
    role?: string;
}