import React, {Dispatch, FunctionComponent, SetStateAction, memo, useCallback} from 'react';
import {Card, Menu} from "antd";
import {FilterOutlined, LoadingOutlined} from "@ant-design/icons";
import {typeAPI} from "../api/typeAPI";

interface Props {
    setType: Dispatch<SetStateAction<number | undefined>>
}

const DeviceFilter = memo(function Filter({setType}: Props) {
    const {data: types, isLoading, isError} = typeAPI.useGetAllTypesQuery()

    const changeType = useCallback((typeName: number | undefined) => {
        setType(typeName)
    }, [])

    console.log('filter rendered')

    return (
        <Card
            title={'Filters'}
        >
            {isLoading &&
                <LoadingOutlined/>
            }

            <Menu title={'Types'}>
                <Menu.Item title={'All'} onClick={() => changeType(undefined)}>
                    All
                </Menu.Item>
                {types &&
                    types.map(type =>
                        <Menu.Item key={type.id} title={type.name} onClick={() => changeType(type.id)}>
                            {type.name}
                        </Menu.Item>
                    )
                }
            </Menu>

        </Card>
    );
});

export default DeviceFilter;