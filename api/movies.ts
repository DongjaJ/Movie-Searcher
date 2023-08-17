import { VercelRequest, VercelResponse } from '@vercel/node';
import movieClient, { httpStatus } from './index.js';

interface MovieRequest extends VercelRequest {
  query: {
    keyword: string;
    page: string;
  };
}

export default async function (
  request: MovieRequest,
  response: VercelResponse,
) {
  try {
    const { keyword, page } = request.query;
    const data = await movieClient.getMovies({ keyword, page: parseInt(page) });
    response.status(httpStatus.OK).json(data);
  } catch (error) {
    console.error(error);
  }
}
