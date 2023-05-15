import {ADMIN_ROUTE, BASKET_ROUTE, GOOD_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "./utils/consts";
import AdminPage from "./pages/AdminPage";
import Basket from "./pages/Basket";
import Shop from "./pages/Shop";
import GoodPage from "./pages/GoodPage";
import Auth from "./pages/Auth";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: AdminPage
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    }
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: GOOD_ROUTE+'/:id',
        Component: GoodPage
    }
]