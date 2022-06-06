import { Menu as AntdMenu } from 'antd'
import { MenuProps as AntdMenuProps } from 'antd/lib/menu'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import { MenuInfo } from 'rc-menu/es/interface'
import { MenuDividerType, MenuItemGroupType } from 'rc-menu/lib/interface'
import { FunctionComponent, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

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
  const { pathname } = useLocation()

  return useMemo(() => {
    if (pathname) {
      return flattenedItems.find(item => typeof item.path === 'string' && pathname === item.path) || null
    }

    return null
  }, [flattenedItems, pathname])
}

export interface MenuProps extends AntdMenuProps {
  items: MenuItem[]
}

const Menu: FunctionComponent<MenuProps> = props => {
  const { items, ...restProps } = props
  const navigate = useNavigate()
  const [flattenedItems, setFlattenedItems] = useState<WithKeys<Omit<MenuItem, 'children'>>[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const activatedItem = useActivatedMenu(flattenedItems)

  useEffect(() => {
    setFlattenedItems(flattenItems(items))
  }, [items])

  useEffect(() => {
    const item = activatedItem || null
    setOpenKeys(item ? item.keys : [])
    setSelectedKeys(item ? [item.key] : [])
  }, [activatedItem])

  const onClick = (info: MenuInfo) => {
    const item = flattenedItems.find(menuItem => info.key === menuItem.key)

    if (item && item.path) {
      navigate(item.path)
    }
  }

  return (
    <AntdMenu
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      defaultOpenKeys={openKeys}
      defaultSelectedKeys={selectedKeys}
      items={items}
      theme="dark"
      mode="inline"
      {...restProps}
      onClick={onClick}
    />
  )
}

Menu.defaultProps = {
  items: [],
}

export default Menu
