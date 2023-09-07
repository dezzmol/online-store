import React, {FunctionComponent} from 'react';
import {IType} from "../../types";
import {Button, Divider} from "antd";
import classes from "./TypeList.module.css"

interface Props {
    types: IType[]
}

const TypeList: FunctionComponent<Props> = ({types}) => {
    return (
        <div>
            <Divider/>
            <div className={classes.container}>
                {types.map(type =>
                    <div className={classes.grid_holder}>
                        <div>
                            {type.id}
                        </div>
                        <div>
                            {type.name}
                        </div>
                        <Button>
                            Delete
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TypeList;