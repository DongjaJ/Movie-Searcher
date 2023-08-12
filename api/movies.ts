import { VercelRequest, VercelResponse } from '@vercel/node';
import movieClient from './index.js';

export default async function (
  request: VercelRequest,
  response: VercelResponse,
) {
  const keyword = request.query.keyword as string;
  const data = await movieClient.getMovies(keyword);
  response.status(200).json(data);
}
