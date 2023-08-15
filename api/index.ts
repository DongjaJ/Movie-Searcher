import axios, { Axios } from 'axios';
interface SearchParams {
  keyword: string;
  releaseYear?: number;
  page?: number;
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

  async getMovies({ keyword, page }: SearchParams) {
    const response = await this.httpClient.get('', {
      params: { s: keyword, page },
    });
    return response.data;
  }

  async getMovieDetail({ movieId }: { movieId: string }) {
    const response = await this.httpClient.get('', {
      params: { i: movieId, plot: 'full' },
    });
    return response.data;
  }
}

const movieClient = new MovieClient();

export default movieClient;
