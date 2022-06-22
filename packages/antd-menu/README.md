# antd-menu

扩展 antd Menu 组件的功能，支持 React Router 导航功能，以及自动从当前地址计算激活的导航。

## 安装

```shell
pnpm add antd-menu
```

## 使用

```typescript jsx
import Menu, { MenuItem } from 'antd-menu'

const config: MenuItem[] = [
    {
        key: 'user',
        path: '/user',
        label: '用户',
        icon: <UserOutlined />,
    },
    {
        key: 'group',
        path: '/group',
        label: '组',
        icon: <TeamOutlined />,
    }
]

function App() {
    <div >
        <Menu items={menuItems} />
    </div>
}

```
