import React, {FunctionComponent} from 'react';
import {IBrand} from "../../types";
import {Divider} from "antd";
import classes from "../Form.module.css";
import BrandItem from "./BrandItem";

interface Props {
    brands: IBrand[]
}

const BrandsList: FunctionComponent<Props> = ({brands}) => {
    return (
        <div>
            <Divider/>
            <div className={classes.container}>
                <div className={classes.grid_holder}>
                    <div>
                        Id
                    </div>
                    <div>
                        Name
                    </div>
                    <div style={{width: '77px'}}>
                        Edit
                    </div>
                </div>

                {brands.map(brand =>
                    <BrandItem key={brand.id} brand={brand}/>
                )}
            </div>

        </div>
    );
};

export default BrandsList;