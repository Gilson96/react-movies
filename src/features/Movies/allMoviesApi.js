import { apiSlice } from '../apiSlice'

const allMoviesApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({

        getMovieDetails: build.query({
            query: (data) => {
                const { id, type } = data;
                return {
                    url: `https://api.themoviedb.org/3/${type}/${id}?api_key=010fbfb2693209806775526572b1daaf`
                }
            },
        }),

        getMovieActors: build.query({
            query: (data) => {
                const { id, type } = data;
                return {
                    url: `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=010fbfb2693209806775526572b1daaf`
                }
            },
        }),

        getMovieRecommendations: build.query({
            query: (data) => {
                const { id, type } = data;
                return {
                    url: `https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=010fbfb2693209806775526572b1daaf`
                }
            },
        }),

        searchMovies: build.query({
            query: (data) => {
                const { title, type } = data;
                return {
                    url: `https://api.themoviedb.org/3/search/${type}?query=${title}&api_key=010fbfb2693209806775526572b1daaf&include_adult=false&language=en-US&page=1`
                }
            },
        }),

    }),
    overrideExisting: false,
})

export const {
    useGetMovieActorsQuery,
    useGetMovieDetailsQuery,
    useGetMovieRecommendationsQuery,
    useSearchMoviesQuery
} = allMoviesApi