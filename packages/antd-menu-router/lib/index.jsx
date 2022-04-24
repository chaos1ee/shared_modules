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
        return <></>;
    }
    return (<>
      {data.map(item => {
            if (item.hidden) {
                return null;
            }
            if (isEmpty(item.children)) {
                return (<Menu.Item key={item.key} icon={item.icon}>
              {item.path && <Link to={item.path}>{item.title}</Link>}
            </Menu.Item>);
            }
            return (<SubMenu title={item.title} key={item.key} icon={item.icon}>
            {item.children && NavItems({ data: item.children })}
          </SubMenu>);
        })}
    </>);
}
const NoMatch = () => {
    const location = useLocation();
    return (<div>
      <h3>
        <span>No match for </span>
        <code>{location.pathname}</code>
      </h3>
    </div>);
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
        return (<Menu theme="dark" mode="inline" defaultOpenKeys={openKeys} defaultSelectedKeys={selectedKeys}>
        {NavItems({ data: config })}
      </Menu>);
    }
    function Routes() {
        return useRoutes(isEmpty(flattenedConfig)
            ? []
            : [
                {
                    path: '/',
                    element: <Navigate replace to={{ pathname: flattenedConfig[0].path }}/>,
                },
                ...config,
                {
                    path: '*',
                    element: <NoMatch />,
                },
            ]);
    }
    return {
        Routes,
        Navs,
    };
}
