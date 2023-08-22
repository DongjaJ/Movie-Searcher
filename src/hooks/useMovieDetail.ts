import { useQuery } from '@tanstack/vue-query';
import { useRoute } from 'vue-router';
import searcher from '@/apis';
import { watch, ref } from 'vue';
import { IMovieDetailResponse } from '@/interface/movieDetail';

export default function useMovieDetail() {
  const route = useRoute();
  const movieIdRef = ref(route.params.movieId);
  const { data, isLoading, isError, isFetching, refetch } =
    useQuery<IMovieDetailResponse>(['movieDetail', movieIdRef.value], () =>
      searcher.getMovieDetail({ movieId: movieIdRef.value as string }),
    );

  watch(
    () => route.params.movieId,
    (movieId) => {
      movieIdRef.value = movieId;
      refetch();
    },
    { immediate: true },
  );

  return { movieDetail: data, isLoading, isError, isFetching };
}
