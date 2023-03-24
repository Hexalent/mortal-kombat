export type Character = {
  title: string
  gif: string
  img: string
  number: number
}

export const getCharacters = async (): Promise<Character[]> => {
  const charactersMap: Record<string, Partial<Character>> = {}

  const heroImages = import.meta.glob('/public/characters/*/*')
  const images = await Promise.all(Object.values(heroImages).map(importImage => importImage()))

  const imagePaths: string[] = images.map((image: any) => image.default)

  imagePaths.forEach((path: string) => {
    const pathComponents = path.split('/')
    const name = pathComponents[3]

    if (!charactersMap[name]) {
      charactersMap[name] = { title: name }
    }

    if (path.includes('_gif')) {
      charactersMap[name].gif = path
    } else {
      charactersMap[name].img = path
    }
  })

  return Object.values(charactersMap).map((character, idx) => {
    return { ...(character as Character), number: idx }
  }) as Character[]
}
