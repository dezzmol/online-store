import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {authAPI} from "../modules/Auth/api/authAPI";
import {brandAPI, deviceAPI, typeAPI} from "../modules/Devices";
import {userReducer} from "./slice/userSlice";
import {cartAPI} from "../modules/Cart";
import {brandAdminAPI, typeAdminAPI} from "../modules/Admin";
import {deviceAdminAPI} from "../modules/Admin/api/deviceAdminAPI";

const rootReducer = combineReducers({
    userReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [deviceAPI.reducerPath]: deviceAPI.reducer,
    [typeAPI.reducerPath]: typeAPI.reducer,
    [brandAPI.reducerPath]: brandAPI.reducer,
    [cartAPI.reducerPath]: cartAPI.reducer,
    [typeAdminAPI.reducerPath]: typeAdminAPI.reducer,
    [brandAdminAPI.reducerPath]: brandAdminAPI.reducer,
    [deviceAdminAPI.reducerPath]: deviceAdminAPI.reducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(deviceAPI.middleware,
            authAPI.middleware,
            typeAPI.middleware,
            brandAPI.middleware,
            cartAPI.middleware,
            typeAdminAPI.middleware,
            brandAdminAPI.middleware,
            deviceAdminAPI.middleware
        )

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch