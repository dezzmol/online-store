import React from 'react';
import {authAPI} from '../api/authAPI'

const Login = () => {
    const [login, {isLoading}] = authAPI.useLoginMutation()

    return (
        <div>

        </div>
    );
};

export default Login;