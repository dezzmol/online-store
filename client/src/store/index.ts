import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {authAPI} from "../modules/Auth/api/authAPI";
import {deviceAPI, typeAPI} from "../modules/Devices";
import {userReducer} from "./slice/userSlice";

const rootReducer = combineReducers({
    userReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [deviceAPI.reducerPath]: deviceAPI.reducer,
    [typeAPI.reducerPath]: typeAPI.reducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(deviceAPI.middleware, authAPI.middleware, typeAPI.middleware)

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch