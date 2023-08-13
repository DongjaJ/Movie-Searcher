export interface IMovieResponse {
  Search: IMovie[];
  totalResults: string;
  Response: string;
}
export interface IMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface SearchParams {
  keyword: string;
  releaseYear?: number;
  page?: number;
}
