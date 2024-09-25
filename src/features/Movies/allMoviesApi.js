import { apiSlice } from '../apiSlice'

const allMoviesApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({

        getTrendingMovies: build.query({
            query: () => ({ url: 'https://api.themoviedb.org/3/trending/movie/day?api_key=010fbfb2693209806775526572b1daaf' }),
        }),

        getPopularMovies: build.query({
            query: () => ({ url: 'https://api.themoviedb.org/3/movie/popular?api_key=010fbfb2693209806775526572b1daaf' }),
        }),

        getMovieDetails: build.query({
            query: (id) => ({ url: `https://api.themoviedb.org/3/movie/${id}?api_key=010fbfb2693209806775526572b1daaf` }),
        }),

        getMovieActors: build.query({
            query: (id) => ({ url: `https://api.themoviedb.org/3/movie/${id}/credits?api_key=010fbfb2693209806775526572b1daaf` }),
        }),

        getMovieRecommendations: build.query({
            query: (id) => ({ url: `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=010fbfb2693209806775526572b1daaf` }),
        }),

        searchMovies: build.query({
            query: (title) => ({ url: `https://api.themoviedb.org/3/search/movie?query=${title}&api_key=010fbfb2693209806775526572b1daaf&include_adult=false&language=en-US&page=1` }),
        }),

    }),
    overrideExisting: false,
})

export const {
    useGetTrendingMoviesQuery,
    useGetPopularMoviesQuery,
    useGetMovieActorsQuery,
    useGetMovieDetailsQuery,
    useGetMovieRecommendationsQuery,
    useSearchMoviesQuery
} = allMoviesApi