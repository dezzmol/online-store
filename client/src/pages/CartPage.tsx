import React, {FunctionComponent, lazy, Suspense} from 'react';
import classes from '../styles/pages.module.css'
import {LoadingOutlined} from "@ant-design/icons";


const CartPage: FunctionComponent = () => {
    const CartForm = lazy(() => import('../modules/Cart'))

    return (
        <div className={classes.page}>
            <Suspense fallback={<LoadingOutlined/>}>
                <CartForm/>
            </Suspense>
        </div>
    );
};

export default CartPage;