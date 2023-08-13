import { IMovieDetailResponse } from '@/interface/movieDetail';
import { IMovieResponse, SearchParams } from '@/interface/movies';

interface IgetMovies {
  ({ keyword }: SearchParams): Promise<IMovieResponse>;
}

interface IgetMovieDetail {
  ({ movieId }: { movieId: string }): Promise<IMovieDetailResponse>;
}

interface apiClient {
  getMovies: IgetMovies;
  getMovieDetail: IgetMovieDetail;
}

export default class Movie {
  constructor(private apiClient: apiClient) {}

  async search({ keyword, page }: SearchParams) {
    return this.apiClient.getMovies({ keyword, page });
  }

  async getMovieDetail({ movieId }: { movieId: string }) {
    return this.apiClient.getMovieDetail({ movieId });
  }
}
