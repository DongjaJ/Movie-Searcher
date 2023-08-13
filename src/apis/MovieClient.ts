import { IMovieDetailResponse } from '@/interface/movieDetail';
import { SearchParams } from '@/interface/movies';
import axios, { Axios } from 'axios';

export default class MovieClient {
  private httpClient: Axios;
  constructor() {
    this.httpClient = axios.create({
      baseURL: '/api',
    });
  }

  async getMovies({ keyword, page }: SearchParams) {
    const response = await this.httpClient.get('/movies', {
      params: { keyword, page },
    });
    return response.data;
  }

  async getMovieDetail({
    movieId,
  }: {
    movieId: string;
  }): Promise<IMovieDetailResponse> {
    const response = await this.httpClient.get('/detail', {
      params: { movieId },
    });
    return response.data;
  }
}
