import { useRoute } from 'vue-router';
import { reactive, watch } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { IMovieResponse } from '@/interface/movies';
import searcher from '@/apis';

export default function useMovies() {
  const route = useRoute();
  const params = reactive(route.params);
  const queryKey = reactive(['movies', params.keyword, params.page]);
  const {
    data: movies,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useQuery<IMovieResponse>(queryKey, () =>
    searcher.search({
      keyword: params.keyword as string,
      page: parseInt(params.page as string),
    }),
  );

  watch(
    () => route.params,
    (newParams) => {
      params.keyword = newParams.keyword;
      params.page = newParams.page;
      refetch();
    },
    { immediate: true },
  );

  return { movies, isLoading, isError, isFetching };
}
