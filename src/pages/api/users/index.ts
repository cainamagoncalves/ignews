import { NextApiRequest, NextApiResponse } from 'next'

// JWT (storage)
// Next auth (Social) => independe de um backend
// Cognito, Auth0

export default (request: NextApiRequest, response: NextApiResponse) => {
  const users = [
    {id: 1, name: 'Cainã'},
    {id: 2, name: 'Bruno'},
    {id: 3, name: 'Matheus'}
  ]

  return response.json(users)
}
