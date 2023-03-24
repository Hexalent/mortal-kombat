import { RouteObject } from 'react-router-dom'
import { namedLazy } from '@/shared/utils'
import { Routes } from '@/shared/configs'

const NotFoundPage = namedLazy(() => import('@/pages/not-found'), 'NotFound')
export const notFoundRouting: RouteObject[] = [
  {
    path: Routes.NOT_FOUND,
    element: <NotFoundPage />
  },
  { path: Routes.ANY, element: <NotFoundPage /> }
]
