import { VercelRequest, VercelResponse } from '@vercel/node';
import movieClient from './index.js';

export default async function (
  request: VercelRequest,
  response: VercelResponse,
) {
  const keyword = request.query.keyword as string;
  const page = parseInt(request.query.page as string);
  const data = await movieClient.getMovies({ keyword, page });
  response.status(200).json(data);
}
