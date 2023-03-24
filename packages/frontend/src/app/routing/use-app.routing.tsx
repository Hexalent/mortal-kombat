import { useRoutes } from 'react-router-dom'
import { getRoutes } from './app.routing'

export const useAppRouting = () => {
  return useRoutes(getRoutes())
}
