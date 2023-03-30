import { useAppRouting } from '@/app/routing/use-app.routing'

export const Application = () => {
  const appRouting = useAppRouting()

  return <>{appRouting}</>
}
