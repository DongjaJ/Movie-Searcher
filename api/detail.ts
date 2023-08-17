import { VercelRequest, VercelResponse } from '@vercel/node';
import movieClient, { httpStatus } from './index.js';

interface MovieDetailRequest extends VercelRequest {
  query: {
    movieId: string;
  };
}

export default async function (
  request: MovieDetailRequest,
  response: VercelResponse,
) {
  try {
    const data = await movieClient.getMovieDetail({
      movieId: request.query.movieId,
    });
    response.status(httpStatus.OK).json(data);
  } catch (error) {
    console.error(error);
  }
}
