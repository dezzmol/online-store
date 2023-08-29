import React, {FunctionComponent} from 'react';
import {DeviceList} from "../modules/Devices";
import classes from '../styles/pages.module.css'

const Shop: FunctionComponent = () => {
    return (
        <div className={classes.page}>
            <h1>SHOP</h1>
            <DeviceList/>
        </div>
    );
};

export default Shop;