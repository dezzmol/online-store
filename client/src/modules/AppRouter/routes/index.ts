import {FunctionComponent} from "react";
import {ADMIN_ROUTE, CART_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import AuthPage from "../../../pages/AuthPage";
import Admin from "../../../pages/Admin";
import CartPage from "../../../pages/CartPage";
import Shop from "../../../pages/Shop";
import DevicePage from "../../../pages/DevicePage";

interface IPages {
    path: string;
    component: FunctionComponent;
}

export const publicPages: IPages[] = [
    {path: LOGIN_ROUTE, component: AuthPage},
    {path: SHOP_ROUTE, component: Shop},
    {path: DEVICE_ROUTE + '/:id', component: DevicePage}
]

export const privatePages: IPages[] = [
    {path: ADMIN_ROUTE, component: Admin},
    {path: CART_ROUTE, component: CartPage},
    {path: SHOP_ROUTE, component: Shop},
    {path: DEVICE_ROUTE + '/:id', component: DevicePage}
]