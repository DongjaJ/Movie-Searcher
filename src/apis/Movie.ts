interface searchParams {
  keyword: string;
  releaseYear?: number;
  page: number;
}

interface movieDetailParams {
  movieId: string;
  plot: string;
}

interface requestSearchParams {
  s: string;
  y: number;
  p: number;
}

interface requestDetailParams {
  i: string;
  plot: string;
}

interface SearchResponse {
  Search: Search;
  totalResults: string;
  Response: string;
}
interface Search {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
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

interface IgetData<T extends SearchResponse | DetailResponse> {
  (params: requestSearchParams | requestDetailParams): Promise<T>;
}

interface apiClient {
  getData: IgetData<SearchResponse | DetailResponse>;
}

export default class Movie {
  constructor(private apiClient: apiClient) {}

  async search({ keyword, releaseYear, page = 1 }: searchParams) {
    return this.apiClient.getData({ s: keyword, y: releaseYear, p: page });
  }

  async getMovieDetail({ movieId, plot = 'short' }: movieDetailParams) {
    return this.apiClient.getData({ i: movieId, plot });
  }
}
