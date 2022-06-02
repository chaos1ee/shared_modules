import { Menu as AntdMenu } from 'antd'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import { MenuInfo } from 'rc-menu/es/interface'
import { MenuDividerType, MenuItemGroupType } from 'rc-menu/lib/interface'
import { FunctionComponent, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { MenuProps as AntdMenuProps } from 'antd/lib/menu'

export type MenuItem = Omit<Exclude<NonNullable<ItemType>, MenuItemGroupType | MenuDividerType>, 'children' | 'key'> & {
  key: string
} & (
    | {
        path: string
        children?: never
      }
    | {
        path?: never
        children: MenuItem[]
      }
  )

type WithKeys<T> = T & { keys: string[] }

function flattenItems(
  items: MenuItem[],
  flattenedItems: WithKeys<Omit<MenuItem, 'children'>>[] = [],
  keys: string[] = [] /** 所有祖先节点的 key 组成的数组，由浅入深排列。**/,
): WithKeys<Omit<MenuItem, 'children'>>[] {
  for (const item of items) {
    if (item.children) {
      flattenItems(item.children as MenuItem[], flattenedItems, [...keys, item.key])
    } else {
      const { children, ...restProps } = item
      flattenedItems.push(Object.assign({}, restProps, { keys: keys }))
    }
  }

  return flattenedItems
}

function useActivatedMenu(flattenedItems: WithKeys<Omit<MenuItem, 'children'>>[]) {
  const location = useLocation()

  return useMemo(() => {
    if (location.pathname) {
      return flattenedItems.find(item => typeof item.path === 'string' && location.pathname === item.path) || null
    }

    return null
  }, [location])
}

export interface MenuProps extends AntdMenuProps {
  items: MenuItem[]
}

const Menu: FunctionComponent<MenuProps> = props => {
  const { items } = props
  const navigate = useNavigate()
  const flattenedItems = flattenItems(items)
  const activatedItem = useActivatedMenu(flattenedItems)
  const defaultItem = activatedItem || null
  const defaultSelectedKeys = defaultItem ? [defaultItem.key] : []
  const defaultOpenKeys = defaultItem ? defaultItem.keys : []

  const onClick = (info: MenuInfo) => {
    const item = flattenedItems.find(menuItem => info.key === menuItem.key)

    if (item && item.path) {
      navigate(item.path)
    }
  }

  return (
    <AntdMenu
      defaultOpenKeys={defaultOpenKeys}
      defaultSelectedKeys={defaultSelectedKeys}
      items={items}
      theme="dark"
      mode="inline"
      onClick={onClick}
    />
  )
}

Menu.defaultProps = {
  items: [],
}

export default Menu
