import { Menu as AntdMenu } from 'antd'
import { MenuProps as AntdMenuProps } from 'antd/lib/menu'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import { MenuInfo } from 'rc-menu/es/interface'
import { MenuDividerType, MenuItemGroupType } from 'rc-menu/lib/interface'
import { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react'
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

function useActivatedMenuItem(items: MenuItem[]) {
  const { pathname } = useLocation()

  return useMemo(() => {
    if (pathname) {
      return flattenItems(items).find(item => typeof item.path === 'string' && pathname === item.path) || null
    }

    return null
  }, [items, pathname])
}

export interface MenuProps extends AntdMenuProps {
  items: MenuItem[]
}

const Menu: FunctionComponent<MenuProps> = props => {
  const { items, ...restProps } = props
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const navigate = useNavigate()
  const activatedItem = useActivatedMenuItem(items)

  useEffect(() => {
    const item = activatedItem || null
    setOpenKeys(item ? item.keys : [])
    setSelectedKeys(item ? [item.key] : [])
  }, [activatedItem])

  const onClick = useCallback(
    (info: MenuInfo) => {
      setSelectedKeys([info.key])

      const item = flattenItems(items).find(menuItem => info.key === menuItem.key)

      if (item && item.path) {
        navigate(item.path)
      }
    },
    [items],
  )

  const onSubMenuClick = (keys: string[]) => {
    setOpenKeys(keys)
  }

  return (
    <AntdMenu
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      items={items}
      theme="dark"
      mode="inline"
      {...restProps}
      onClick={onClick}
      onOpenChange={onSubMenuClick}
    />
  )
}

Menu.defaultProps = {
  items: [],
}

export default Menu
