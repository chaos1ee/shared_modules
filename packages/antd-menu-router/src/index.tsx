import { Menu } from 'antd'
import { isEmpty } from 'lodash-es'
import { ReactElement, ReactNode, useState } from 'react'
import { Link, Navigate, useLocation, useRoutes } from 'react-router-dom'

const { SubMenu } = Menu

interface BaseRouteConfig {
  /** key 必须唯一。 */
  key: string
  title: string
  icon?: ReactNode
  hidden?: boolean
}

interface NormalRouteConfig extends BaseRouteConfig {
  path: string
  children?: never
  element: ReactElement | null
}

interface SubrouteConfig extends BaseRouteConfig {
  path?: never
  children: RouteConfig[]
  component?: never
}

interface FlattenedNavConfig extends NormalRouteConfig {
  ancestorKeys: string[] // 由所有祖先节点的 key 组成的数组，按照正序排列，如：["k1", "k2", ... ]，当前节点为根节点时该属性为空数组。
}

export type RouteConfig = NormalRouteConfig | SubrouteConfig

// 递归生成扁平化的配置
function flattenConfig(items: RouteConfig[], flattened: FlattenedNavConfig[], openKeys: string[] = []) {
  for (const item of items) {
    if (item.children) {
      flattenConfig(item.children, flattened, [...openKeys, item.key])
    } else {
      flattened.push({
        ...(item as NormalRouteConfig),
        ancestorKeys: openKeys as string[],
      })
    }
  }
  return flattened
}

function NavItems({ data }: { data: RouteConfig[] }) {
  if (isEmpty(data)) {
    return <></>
  }

  return (
    <>
      {data.map(item => {
        if (item.hidden) {
          return null
        }

        if (isEmpty(item.children)) {
          return (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.path && <Link to={item.path}>{item.title}</Link>}
            </Menu.Item>
          )
        }

        return (
          <SubMenu title={item.title} key={item.key} icon={item.icon}>
            {item.children && NavItems({ data: item.children })}
          </SubMenu>
        )
      })}
    </>
  )
}

const NoMatch = () => {
  const location = useLocation()

  return (
    <div>
      <h3>
        <span>No match for </span>
        <code>{location.pathname}</code>
      </h3>
    </div>
  )
}

export default function generateRoute(config: RouteConfig[]) {
  const flattenedConfig = flattenConfig(config, [])

  // 返回当前页面的导航配置
  function useActivatedRouteConfig() {
    const location = useLocation()

    if (location.pathname) {
      return flattenedConfig.find(item => location.pathname.startsWith(item.path))
    }

    return null
  }

  function Navs() {
    const currentRouteConfig = useActivatedRouteConfig()
    // 初始化 openKeys 和 selectedKeys，以在页面刷新之后，自动展开和高亮 antd Menu。
    const [openKeys] = useState(currentRouteConfig?.ancestorKeys ?? [])
    const [selectedKeys] = useState([currentRouteConfig?.key ?? '1'])

    return (
      <Menu theme="dark" mode="inline" defaultOpenKeys={openKeys} defaultSelectedKeys={selectedKeys}>
        {NavItems({ data: config })}
      </Menu>
    )
  }

  function Routes() {
    return useRoutes(
      isEmpty(flattenedConfig)
        ? []
        : [
            {
              path: '/',
              element: <Navigate replace to={{ pathname: flattenedConfig[0].path }} />,
            },
            ...config,
            {
              path: '*',
              element: <NoMatch />,
            },
          ],
    )
  }

  return {
    Routes,
    Navs,
  }
}
