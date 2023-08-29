import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

interface IAuth {
    email: string | null;
    id: number | null;
    role: string | null;
    isAuth: boolean
}



interface IDecodeToken {
    email: string;
    id: number;
    role: string;
}

const initialState: IAuth = {
    email: null,
    id: null,
    role: null,
    isAuth: false
}

const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<string>) => {
            const jwttoken: IDecodeToken = jwtDecode(action.payload)
            state.email = jwttoken.email
            state.id = jwttoken.id
            state.role = jwttoken.role
            state.isAuth = true
        },
        deleteUser: (state) => {
            state.email =  null
            state.id = null
            state.role = null
            state.isAuth = false
            localStorage.setItem('token', '')
        }
    }
})

export const {setUser, deleteUser} = userSlice.actions

export const userReducer = userSlice.reducer