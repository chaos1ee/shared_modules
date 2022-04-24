# antd-menu-router

## Install

```shell
yarn add antd-menu-router
```

## Usage

```typescript jsx
import generateRoute, { RouteConfig } from 'antd-menu-router'

const config: RouteConfig[] = [
    {
        key: 'mail',
        title: '邮件',
        path: '/mail',
        icon: <MailOutlined />,
        element: <Mail />,
    },
]

const { Navs, Routes } = generateRoute(config)


function App() {
    <div >
        <div className="nav">
            <Navs />
        </div>
        <div className="content">
            <Routes /> 
        </div>
    </div>
}

```
