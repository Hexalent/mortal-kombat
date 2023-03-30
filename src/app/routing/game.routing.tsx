import { RouteObject } from 'react-router-dom'
import { namedLazy } from '@/shared/utils'

const StartGamePage = namedLazy(() => import('@/pages/start-game'), 'StartGame')

export const gameRouting: RouteObject[] = [{ index: true, element: <StartGamePage /> }]
