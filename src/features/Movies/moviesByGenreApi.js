import { apiSlice } from '../apiSlice'

const moviesByGenreApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({

        getTrendingMovies: build.query({
            query: (type) => ({ url: `https://api.themoviedb.org/3/trending/${type}/day?api_key=010fbfb2693209806775526572b1daaf` }),
        }),

        getMovieGenreList: build.query({
            query: (type) => ({ url: `https://api.themoviedb.org/3/genre/${type}/list?api_key=010fbfb2693209806775526572b1daaf` }),
        }),

        getMovieByGenre: build.query({
            query: (data) => {
                const { genre, type } = data;
                return {
                    url: `https://api.themoviedb.org/3/discover/${type}?api_key=010fbfb2693209806775526572b1daaf&include_adult=false&page=1&sort_by=primary_release_date.desc&vote_average.gte=6&vote_average.lte=8&with_genres=${genre}&with_origin_country=US&year=2024`
                }
            },
        }),


        getMovieByList: build.query({
            query: (data) => {
                const { list, type } = data;
                return {
                    url: `https://api.themoviedb.org/3/${type}/${list}?api_key=010fbfb2693209806775526572b1daaf`
                }
            },
        }),

    }),
    overrideExisting: false,
})

export const {
    useGetMovieGenreListQuery,
    useGetMovieByListQuery,
    useGetTrendingMoviesQuery,
    useGetMovieByGenreQuery
} = moviesByGenreApi