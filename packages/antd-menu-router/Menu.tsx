import { Menu as AntdMenu } from 'antd'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import { MenuDividerType, MenuItemGroupType, SubMenuType } from 'rc-menu/lib/interface'
import { FunctionComponent, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

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

function flattenMenuItems(items: MenuItem[], flattenedItems: MenuItem[] = []) {
  for (const item of items) {
    if ((item as SubMenuType).children) {
      flattenMenuItems((item as SubMenuType).children as MenuItem[], flattenedItems)
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

  useEffect(() => {
    setFlattenedItems(flattenMenuItems(items))
  }, [items])

  useEffect(() => {
    setSelectedKeys(activatedItem?.key ? [activatedItem.key + ''] : [])
  }, [activatedItem?.key])

  function renderItems(items: MenuItem[]) {
    return (
      <>
        {items.map(item => {
          if (!item.children?.length) {
            return (
              <AntdMenu.Item key={item.key} icon={item.icon}>
                <Link to={item.path || ''}>
                  {item.label} - {item.path}
                </Link>
              </AntdMenu.Item>
            )
          }

          return (
            <AntdMenu.SubMenu title={item.label} key={item.key} icon={item.icon}>
              {item.children && renderItems(item.children)}
            </AntdMenu.SubMenu>
          )
        })}
      </>
    )
  }

  return (
    <AntdMenu selectedKeys={selectedKeys} theme="dark">
      {renderItems(items)}
    </AntdMenu>
  )
}

Menu.defaultProps = {
  items: [],
}

export default Menu
