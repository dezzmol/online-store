import React, {FunctionComponent, lazy, Suspense, useEffect} from 'react';
import {useAppSelector} from "../hooks/useTyped";
import {useNavigate} from "react-router-dom";
import {LoadingOutlined} from "@ant-design/icons";
import classes from "../styles/pages.module.css"

const Admin: FunctionComponent = () => {
    const {role} = useAppSelector(state => state.userReducer)
    const navigate = useNavigate()


    useEffect(() => {
        if (role !== "ADMIN") {
            navigate('/')
        }
    }, [])
    const AdminPage = lazy(() => import('../modules/Admin'))
    return (
        <div className={classes.page}>
            <Suspense fallback={<LoadingOutlined/>}>
                <AdminPage/>
            </Suspense>
        </div>
    );
};

export default Admin;