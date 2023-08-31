import React, {useEffect} from 'react';
import {BrowserRouter} from "react-router-dom";
import {AppRouter} from "./modules/AppRouter";
import {ConfigProvider} from "antd";
import {GlobalLayout} from "./modules/Layout";
import {Theme} from "./theme";
import {useAppDispatch} from "./hooks/useTyped";
import {useCheckQuery} from "./modules/Auth";
import jwtDecode from "jwt-decode";
import {setUser} from "./store/slice/userSlice";

const App = () => {
    let token = localStorage.getItem('token')

    const {data, isLoading} = useCheckQuery(token)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (data) {
            console.log(data)
            if (data.token) {
                console.log(data.token)
                console.log(jwtDecode(data.token))
                dispatch(setUser(data.token))
            }
        }
    }, [data])


    return (
        <ConfigProvider
            theme={Theme}
        >
            <BrowserRouter>
                <GlobalLayout>
                    <AppRouter/>
                </GlobalLayout>
            </BrowserRouter>
        </ConfigProvider>
    );
};

export default App;