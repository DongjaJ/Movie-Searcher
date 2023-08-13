import { ResponseValue } from '@/views/Movies.vue';

interface SearchParams {
  keyword: string;
  releaseYear?: number;
  page?: number;
}

interface DetailResponse {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: {
    Source: string;
    Value: string;
  }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

interface IgetMovies {
  ({ keyword }: SearchParams): Promise<ResponseValue>;
}

interface IgetMovieDetail {
  ({ movieId }: { movieId: string }): Promise<DetailResponse>;
}

interface apiClient {
  getMovies: IgetMovies;
  getMovieDetail: IgetMovieDetail;
}

export default class Movie {
  constructor(private apiClient: apiClient) {}

  async search({ keyword }: SearchParams) {
    return this.apiClient.getMovies({ keyword });
  }

  async getMovieDetail({ movieId }: { movieId: string }) {
    return this.apiClient.getMovieDetail({ movieId });
  }
}
