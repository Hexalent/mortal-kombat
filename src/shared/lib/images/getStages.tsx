export type Stage = {
  title: string
  img: string
  number: number
}

export const getStages = async (): Promise<Stage[]> => {
  const stageImages = import.meta.glob('/public/stages/*') as Record<string, () => Promise<{ default: string }>>
  const imagePaths = await Promise.all(Object.values(stageImages).map(importImage => importImage()))

  return imagePaths.map((path, index) => ({
    title: path.default.split('/')[3],
    img: path.default,
    number: index
  })) as Stage[]
}
