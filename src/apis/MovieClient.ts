import axios, { Axios } from 'axios';

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

export default class MovieClient {
  private httpClient: Axios;
  constructor() {
    this.httpClient = axios.create({
      baseURL: '/api',
    });
  }

  async getMovies({ keyword }: { keyword: string }) {
    const response = await this.httpClient.get('/movies', {
      params: { keyword },
    });
    return response.data;
  }

  async getMovieDetail({
    movieId,
  }: {
    movieId: string;
  }): Promise<DetailResponse> {
    const response = await this.httpClient.get('/detail', {
      params: { movieId },
    });
    return response.data;
  }
}
