import React, {Dispatch, FunctionComponent, SetStateAction, useState} from 'react';
import {Button, Form, Input} from "antd";

interface Props {
    login: (email: string, password: string) => void

}

const Login: FunctionComponent<Props> = ({login}) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            autoComplete="off"
        >
            <h1>Sign In</h1>
            <Form.Item
                label="Email"
                name="Email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Item>



            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" onClick={() => login(email, password)}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Login;