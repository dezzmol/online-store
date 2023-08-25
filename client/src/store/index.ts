import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "../modules/Auth";
import {authAPI} from "../modules/Auth/api/authAPI";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authAPI.reducerPath]: authAPI.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch