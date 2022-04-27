import { Menu as AntdMenu } from 'antd'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import { MenuDividerType, MenuItemGroupType, SubMenuType } from 'rc-menu/lib/interface'
import { FunctionComponent, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { MenuInfo } from 'rc-menu/es/interface'

export type MenuItem = Omit<Exclude<NonNullable<ItemType>, MenuItemGroupType | MenuDividerType>, 'children'> &
  (
    | {
        path: string
        children?: never
      }
    | {
        path?: never
        children: MenuItem[]
      }
  )

function flattenItems(items: MenuItem[], flattenedItems: MenuItem[] = []) {
  for (const item of items) {
    if ((item as SubMenuType).children) {
      flattenItems((item as SubMenuType).children as MenuItem[], flattenedItems)
    } else {
      flattenedItems.push(item)
    }
  }
  return flattenedItems
}

function useActivatedMenu(flattenedItems: MenuItem[]) {
  const location = useLocation()

  if (location.pathname) {
    return flattenedItems.find(item => location.pathname === item.key + '') || null
  }

  return null
}

export interface MenuProps {
  items: MenuItem[]
}

const Menu: FunctionComponent<MenuProps> = props => {
  const { items } = props
  const [selectedKeys, setSelectedKeys] = useState<string[]>()
  const [flattenedItems, setFlattenedItems] = useState<MenuItem[]>([])
  const activatedItem = useActivatedMenu(flattenedItems)
  const navigate = useNavigate()

  useEffect(() => {
    setFlattenedItems(flattenItems(items))
  }, [items])

  useEffect(() => {
    setSelectedKeys(activatedItem?.key ? [activatedItem.key + ''] : [])
  }, [activatedItem?.key])

  const onClick = ({ key }: MenuInfo) => {
    const item = flattenedItems.find(item => key === item.key)

    if (item && item.path) {
      navigate(item.path)
      setSelectedKeys([key])
    }
  }

  return <AntdMenu selectedKeys={selectedKeys} items={items} theme="dark" onClick={onClick} />
}

Menu.defaultProps = {
  items: [],
}

export default Menu
