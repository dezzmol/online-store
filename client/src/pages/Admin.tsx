import React, {FunctionComponent, useEffect} from 'react';
import {useAppSelector} from "../hooks/useTyped";
import {useNavigate} from "react-router-dom";

const Admin: FunctionComponent = () => {
    const {role} = useAppSelector(state => state.userReducer)
    const navigate = useNavigate()

    useEffect(() => {
        if (role !== "ADMIN") {
            navigate('/')
        }
    }, [])

    return (
        <div>

        </div>
    );
};

export default Admin;