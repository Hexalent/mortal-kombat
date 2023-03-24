import { RouteObject } from 'react-router-dom'
import { namedLazy } from '@/shared/utils'

const NotFoundPage = namedLazy(() => import('@/pages/not-found'), 'NotFound')
export const notFoundRouting: RouteObject[] = [
  {
    path: '404',
    element: <NotFoundPage />
  },
  { path: '*', element: <NotFoundPage /> }
]
