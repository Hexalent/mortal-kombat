import { RouteObject } from 'react-router-dom'
import { BasicLayout } from '@/shared/layouts'
import { notFoundRouting } from './not-found.routing'
import { fighterRouting } from './fighter.routing'
import { gameRouting } from './game.routing'

export const getRoutes = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <BasicLayout />,
      children: [...gameRouting, ...fighterRouting, ...notFoundRouting]
    }
  ]

  return routes
}
