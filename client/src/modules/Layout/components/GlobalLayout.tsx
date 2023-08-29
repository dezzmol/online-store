import React, {FunctionComponent, useState} from 'react';
import {Col, Layout, Menu, Modal, Row} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../hooks/useTyped";
import {deleteUser} from "../../../store/slice/userSlice";

interface IProps {
    children: React.ReactNode
}

const GlobalLayout: FunctionComponent<IProps> = ({children}) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {isAuth, role} = useAppSelector(state => state.userReducer)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        dispatch(deleteUser())
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Layout>
            <Header>

                <Menu
                    theme='dark'
                    mode='horizontal'
                    selectable={false}
                    style={{}}
                >

                    <Menu.Item onClick={() => navigate('/')}>
                        SHOP
                    </Menu.Item>

                    {isAuth ?
                        <Menu.Item onClick={() => showModal()}>
                            LOGOUT
                        </Menu.Item>
                        :
                        <Menu.Item onClick={() => navigate('/login')}>
                            LOGIN
                        </Menu.Item>
                    }

                    <Menu.Item onClick={() => navigate('/cart')}>
                        CART
                    </Menu.Item>

                    {role === 'ADMIN' &&
                        <Menu.Item onClick={() => navigate('/admin')}>
                            ADMIN
                        </Menu.Item>
                    }
                </Menu>

            </Header>
            <Content style={{margin: '50px 50px'}}>
                <div className="site-layout-content" style={{height: '100vh', padding: '50px 50px'}}>
                    {children}
                    <Modal title="Are you sure?" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <p>Are you going to logout?</p>
                    </Modal>
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>Created by @dezzmol with ❤</Footer>
        </Layout>
    );
};

export {GlobalLayout};