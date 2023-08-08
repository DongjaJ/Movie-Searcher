import { useQuery } from 'vue-query';
import axios, { Axios } from 'axios';
import { reactive } from 'vue';

const API_END_POINT = 'https://omdbapi.com';

async function getMovies() {
  const axiosInstance: Axios = axios.create({
    baseURL: API_END_POINT,
    params: {
      apikey: import.meta.env.VITE_API_KEY,
    },
  });
  const response = await axiosInstance.get('', { params: { s: 'frozen' } });
  console.log(response);
  return response.data;
}

export default function useMovies() {
  const { data, isLoading, error } = useQuery(['movies'], getMovies);
  const movies = reactive({ data });
  return { movies, isLoading, error };
}
