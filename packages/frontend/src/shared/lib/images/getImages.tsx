export type TCharactersObj = {
  title: string
  gif: string
  img: string
  number: number
}

export const getImages = async () => {
  const charactersObj: any = {}

  const heroImages = import.meta.glob('/public/characters/*/*')
  const images = await Promise.all(Object.values(heroImages).map(importImage => importImage()))

  const characters: string[] = images.map((image: any) => image.default)

  characters.forEach((char: string) => {
    const name = char.split('/')[3]
    if (!charactersObj[name]) charactersObj[name] = { title: name }
    if (char.includes('_gif')) charactersObj[name].gif = char
    else charactersObj[name].img = char
  })

  return Object.values(charactersObj).map((characterObj, idx) => {
    return { ...(characterObj as TCharactersObj), number: idx }
  }) as TCharactersObj[]
}
