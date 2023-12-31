import React, {FunctionComponent} from 'react';
import {IType} from "../../types";
import {Divider} from "antd";
import classes from "../Form.module.css"
import TypeItem from "./TypeItem";

interface Props {
    types: IType[]
}

const TypeList: FunctionComponent<Props> = ({types}) => {
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

                {types.map(type =>
                    <TypeItem key={type.id} type={type}/>
                )}
            </div>
        </div>
    );
};

export default TypeList;