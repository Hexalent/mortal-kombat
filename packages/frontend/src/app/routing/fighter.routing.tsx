import { RouteObject } from 'react-router-dom'
import { namedLazy } from '@/shared/utils'
import { Routes } from '@/shared/configs'

const FighterSelectPage = namedLazy(() => import('@/pages/fighter-select'), 'FighterSelect')
const FighterViewPage = namedLazy(() => import('@/pages/fighter-view'), 'FighterView')

export const fighterRouting: RouteObject[] = [
  { path: Routes.FIGHTER_SELECT, element: <FighterSelectPage /> },
  { path: Routes.FIGHTER_VIEW, element: <FighterViewPage /> }
]
