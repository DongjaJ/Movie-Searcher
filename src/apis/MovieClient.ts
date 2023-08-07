import axios, { Axios } from 'axios';

const API_END_POINT = 'https://omdbapi.com';

export default class MovieClient {
  private httpClient: Axios;
  constructor() {
    this.httpClient = axios.create({
      baseURL: API_END_POINT,
      params: {
        apikey: import.meta.env.VITE_API_KEY,
      },
    });
  }

  async getData(params) {
    return this.httpClient.get('', params);
  }
}
