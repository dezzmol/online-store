import {FunctionComponent} from "react";
import {ADMIN_ROUTE, CART_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import Auth from "../pages/Auth";
import Admin from "../pages/Admin";
import Cart from "../pages/Cart";
import Shop from "../pages/Shop";
import DevicePage from "../pages/DevicePage";

interface IPages {
    path: string;
    component: FunctionComponent;
}

export const publicPages: IPages[] = [
    {path: LOGIN_ROUTE, component: Auth},
    {path: REGISTRATION_ROUTE, component: Auth},
    {path: SHOP_ROUTE, component: Shop},
    {path: DEVICE_ROUTE + '/:id', component: DevicePage}
]

export const privatePages: IPages[] = [
    {path: ADMIN_ROUTE, component: Admin},
    {path: CART_ROUTE, component: Cart},
    {path: SHOP_ROUTE, component: Shop},
    {path: DEVICE_ROUTE + '/:id', component: DevicePage}
]