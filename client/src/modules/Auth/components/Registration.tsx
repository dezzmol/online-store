import React, {Dispatch, FunctionComponent, SetStateAction, useState} from 'react';
import {Button, Form, Input} from "antd";

interface Props {
    reg: (email: string, password: string) => void
}

const Registration: FunctionComponent<Props> = ({reg}) => {
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
            <h1>Sign Up</h1>
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



            <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{marginLeft: '0'}}>
                <Button type="primary" htmlType="submit" onClick={() => reg(email, password)}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Registration;