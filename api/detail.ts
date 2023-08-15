import { VercelRequest, VercelResponse } from '@vercel/node';
import movieClient from './index.js';

export default async function (
  request: VercelRequest,
  response: VercelResponse,
) {
  try {
    const movieId = request.query.movieId as string;
    const data = await movieClient.getMovieDetail({ movieId });
    response.status(200).json(data);
  } catch (error) {
    console.error(error);
  }
}
