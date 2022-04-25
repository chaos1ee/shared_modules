import { Menu as AtdMenu } from 'antd'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import { MenuDividerType, MenuInfo, MenuItemGroupType, SubMenuType } from 'rc-menu/lib/interface'
import { FunctionComponent, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export type MenuItemType = Exclude<NonNullable<ItemType>, MenuItemGroupType | MenuDividerType>

function flattenMenuItems(items: MenuItemType[], flattenedItems: MenuItemType[] = []) {
  for (const item of items) {
    if ((item as SubMenuType).children) {
      flattenMenuItems((item as SubMenuType).children as MenuItemType[], flattenedItems)
    } else {
      flattenedItems.push(item)
    }
  }
  return flattenedItems
}

function useActivatedMenu(flattenedItems: MenuItemType[]) {
  const location = useLocation()

  if (location.pathname) {
    return flattenedItems.find(item => location.pathname === item.key + '') || null
  }

  return null
}

export interface MenuProps {
  items: MenuItemType[]
}

const Menu: FunctionComponent<MenuProps> = props => {
  const { items } = props
  const navigate = useNavigate()
  const [selectedKeys, setSelectedKeys] = useState<string[]>()
  const [flattenedItems, setFlattenedItems] = useState<MenuItemType[]>([])
  const activatedItem = useActivatedMenu(flattenedItems)

  useEffect(() => {
    setFlattenedItems(flattenMenuItems(items))
  }, [items])

  const onMenuItemClick = ({ key }: MenuInfo) => {
    navigate(key)
    setSelectedKeys([key])
  }

  useEffect(() => {
    setSelectedKeys(activatedItem?.key ? [activatedItem.key + ''] : [])
  }, [activatedItem?.key])

  return <AtdMenu selectedKeys={selectedKeys} theme="dark" items={items} onClick={onMenuItemClick} />
}

Menu.defaultProps = {
  items: [],
}

export default Menu
