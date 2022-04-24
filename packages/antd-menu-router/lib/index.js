import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Menu } from 'antd';
import { isEmpty } from 'lodash-es';
import { useState } from 'react';
import { Link, Navigate, useLocation, useRoutes } from 'react-router-dom';
const { SubMenu } = Menu;
function flattenConfig(items, flattened, openKeys = []) {
    for (const item of items) {
        if (item.children) {
            flattenConfig(item.children, flattened, [...openKeys, item.key]);
        }
        else {
            flattened.push(Object.assign(Object.assign({}, item), { ancestorKeys: openKeys }));
        }
    }
    return flattened;
}
function NavItems({ data }) {
    if (isEmpty(data)) {
        return _jsx(_Fragment, {});
    }
    return (_jsx(_Fragment, { children: data.map(item => {
            if (item.hidden) {
                return null;
            }
            if (isEmpty(item.children)) {
                return (_jsx(Menu.Item, Object.assign({ icon: item.icon }, { children: item.path && _jsx(Link, Object.assign({ to: item.path }, { children: item.title })) }), item.key));
            }
            return (_jsx(SubMenu, Object.assign({ title: item.title, icon: item.icon }, { children: item.children && NavItems({ data: item.children }) }), item.key));
        }) }));
}
const NoMatch = () => {
    const location = useLocation();
    return (_jsx("div", { children: _jsxs("h3", { children: [_jsx("span", { children: "No match for " }), _jsx("code", { children: location.pathname })] }) }));
};
export default function generateRoute(config) {
    const flattenedConfig = flattenConfig(config, []);
    function useActivatedRouteConfig() {
        const location = useLocation();
        if (location.pathname) {
            return flattenedConfig.find(item => location.pathname.startsWith(item.path));
        }
        return null;
    }
    function Navs() {
        var _a, _b;
        const currentRouteConfig = useActivatedRouteConfig();
        const [openKeys] = useState((_a = currentRouteConfig === null || currentRouteConfig === void 0 ? void 0 : currentRouteConfig.ancestorKeys) !== null && _a !== void 0 ? _a : []);
        const [selectedKeys] = useState([(_b = currentRouteConfig === null || currentRouteConfig === void 0 ? void 0 : currentRouteConfig.key) !== null && _b !== void 0 ? _b : '1']);
        return (_jsx(Menu, Object.assign({ theme: "dark", mode: "inline", defaultOpenKeys: openKeys, defaultSelectedKeys: selectedKeys }, { children: NavItems({ data: config }) })));
    }
    function Routes() {
        return useRoutes(isEmpty(flattenedConfig)
            ? []
            : [
                {
                    path: '/',
                    element: _jsx(Navigate, { replace: true, to: { pathname: flattenedConfig[0].path } }),
                },
                ...config,
                {
                    path: '*',
                    element: _jsx(NoMatch, {}),
                },
            ]);
    }
    return {
        Routes,
        Navs,
    };
}
