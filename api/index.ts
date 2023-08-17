import { IMovieDetailResponse } from '../src/interface/movieDetail';
import { IMovieResponse } from '../src/interface/movies';
import axios, { Axios, AxiosResponse } from 'axios';

interface SearchParams {
  keyword: string;
  releaseYear?: number;
  page?: number;
}

export const httpStatus = {
  OK: 200,
};

const { API_END_POINT, API_KEY } = process.env;

class MovieClient {
  private httpClient: Axios;
  constructor() {
    this.httpClient = axios.create({
      baseURL: API_END_POINT,
      params: {
        apikey: API_KEY,
      },
    });
  }

  async getMovies({ keyword, page }: SearchParams): Promise<IMovieResponse> {
    const response: AxiosResponse<IMovieResponse> = await this.httpClient.get(
      '',
      {
        params: { s: keyword, page },
      },
    );
    return response.data;
  }

  async getMovieDetail({
    movieId,
  }: {
    movieId: string;
  }): Promise<IMovieDetailResponse> {
    const response: AxiosResponse<IMovieDetailResponse> =
      await this.httpClient.get('', {
        params: { i: movieId, plot: 'full' },
      });
    return response.data;
  }
}

const movieClient = new MovieClient();

export default movieClient;
