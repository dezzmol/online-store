import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {privatePages, publicPages} from "../routes";
import {SHOP_ROUTE} from "../utils/consts";


const AppRouter = () => {
    const isAuth = false
    return (
        <Routes>
            {isAuth && privatePages.map(route =>
                    <Route
                        path={route.path}
                        element={<route.component/>}
                        key={route.path}
                    />
                )}

            {publicPages.map(route =>
                    <Route
                        path={route.path}
                        element={<route.component/>}
                        key={route.path}
                    />
                )
            }
            <Route path={'*'} element={<Navigate to={'/'} replace={true}/> }/>
        </Routes>
    );
};

export default AppRouter;