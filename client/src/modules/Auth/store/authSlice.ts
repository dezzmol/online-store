import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IAuth {
    token: string | null
}

const initialState: IAuth = {
    token: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload
        }
    }
})

export const {setToken} = authSlice.actions

export const authReducer = authSlice.reducer