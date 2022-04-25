import { FunctionComponent } from 'react'
import { RouteObject, useLocation, useRoutes } from 'react-router-dom'

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

export interface RoutesProps {
  routes: RouteObject[]
}

const Routes: FunctionComponent<RoutesProps> = props => {
  const { routes } = props
  return useRoutes(routes.concat({ path: '*', element: <NoMatch /> }))
}

Routes.defaultProps = {
  routes: [],
}

export default Routes
