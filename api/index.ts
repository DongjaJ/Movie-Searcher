import axios, { Axios } from 'axios';

export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface DetailResponse {
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

const API_END_POINT = 'https://omdbapi.com';

class MovieClient {
  private httpClient: Axios;
  constructor() {
    this.httpClient = axios.create({
      baseURL: API_END_POINT,
      params: {
        apikey: process.env.VITE_API_KEY,
      },
    });
  }

  async getMovies(keyword: string) {
    const response = await this.httpClient.get('', { params: { s: keyword } });
    return response.data;
  }

  async getMovieDetail({
    movieId,
  }: {
    movieId: string;
  }): Promise<DetailResponse> {
    const response = await this.httpClient.get('', {
      params: { i: movieId, plot: 'full' },
    });
    return response.data;
  }
}

const movieClient = new MovieClient();

export default movieClient;
