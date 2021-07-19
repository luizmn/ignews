import { NextApiRequest, NextApiResponse } from 'next';

export default (request: NextApiRequest, response: NextApiResponse) => {

  const id = request.query.id;

  const users = [
{ id: 1, name: 'John Doe'},
{ id: 2, name: 'Jane Doe'},
{ id: 3, name: 'Bob Smith'},
  ]

  return response.json(users);
}