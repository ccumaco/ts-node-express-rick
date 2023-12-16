import { Request, Response } from 'express'

export const getCharacters = async (req: Request, res: Response) => {
  try {
    const { species, page } = req.body
    const response = await fetch('https://rickandmortyapi.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
                query {
                    characters(page: ${page}, filter: { species: "${species}" }) {
                      info {
                        count
                      }
                      results {
                        id
                        name
                        status
                        species
                        image,
                        location {
                            name
                        },
                        origin {
                            name
                        }
                        
                      }
                    }
                  }
                `,
      }),
    })
    const data = await response.json()
    res.status(200).send({
      info: data.data.characters.info,
      characters: data.data.characters.results,
    })
  } catch (error) {
    res.status(500).send('Error in server:' + error)
  }
}
export const getSingleCharacter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const response = await fetch('https://rickandmortyapi.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
                query {
                    charactersByIds(ids: ${id}) {
                      id
                      name
                      status
                      species
                      image
                      origin {
                        name
                        }
                      }
                  }
                `,
      }),
    })
    const data = await response.json()
    res.status(200).send(data.data.charactersByIds[0])
  } catch (error) {
    res.status(500).send('Error in server:' + error)
  }
}
