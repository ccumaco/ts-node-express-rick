import { Request, Response } from 'express'

export const getCharacters = async (req: Request, res: Response) => {
  try {
    const { species } = req.body
    console.log(species, 'species')

    const response = await fetch('https://rickandmortyapi.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
                query {
                    characters(filter: { species: "${species}" }) {
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
    console.log(data, 'data data')

    res.status(200).send(data.data.characters.results)
  } catch (error) {
    res.status(500).send('Error in server:' + error)
  }
}
