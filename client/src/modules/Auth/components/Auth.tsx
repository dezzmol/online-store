import React, {useState} from 'react';
import {authAPI} from '../api/authAPI'
import {Row} from "antd";
import Login from "./Login";
import Registration from "./Registration";
import {useAppDispatch, useAppSelector} from "../../../hooks/useTyped";
import jwtDecode from "jwt-decode";
import {setUser} from "../../../store/slice/userSlice";
import {useNavigate} from "react-router-dom";

const Auth = () => {
    const [login, {}] = authAPI.useLoginMutation()
    const [reg, {}] = authAPI.useRegistrationMutation()
    const [haveAcc, setHaveAcc] = useState<boolean>(false)
    const user = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const signIn = async (email: string, password: string) => {
        const result = await login({email, password})

        if (result) {
            //@ts-ignore
            if (result.data) {
                // @ts-ignore
                localStorage.setItem('token', result.data.token)

                // @ts-ignore
                dispatch(setUser(result.data.token))
                navigate('/')
            }
        }

    }

    const signUp = async (email: string, password:string) => {
        const result = await reg({email, password})

        // @ts-ignore
        if (result) {
            //@ts-ignore
            if (result.data) {
                // @ts-ignore
                localStorage.setItem('token', result.data.token)

                // @ts-ignore
                dispatch(setUser(result.data.token))
                navigate('/')
            }
        }
    }



    return (
        <Row justify={"center"} align={"middle"}>
            {haveAcc ?
                <div style={{
                    textAlign: "center",
                    border: 'black 0.5px solid',
                    borderRadius: '5px',
                    background: '#FFFFFF',
                    padding: '10px 10px'
                }}>
                    <Login login={signIn}/>
                    <div onClick={() => setHaveAcc(!haveAcc)}>
                        Have no acc? Sign Up
                    </div>
                </div>
                :
                <div style={{
                    textAlign: "center",
                    border: 'black 0.5px solid',
                    borderRadius: '5px',
                    background: '#FFFFFF',
                    padding: '10px 10px'
                }}>
                    <Registration reg={signUp}/>
                    <div onClick={() => setHaveAcc(!haveAcc)}>
                        Already have a acc? Sign In
                    </div>
                </div>
            }

        </Row>
    );
};

export {Auth};