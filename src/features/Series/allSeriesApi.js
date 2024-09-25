import { apiSlice } from '../apiSlice'

const allSeriesApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({

        getTrendingSeries: build.query({
            query: () => ({ url: 'https://api.themoviedb.org/3/trending/tv/day?api_key=010fbfb2693209806775526572b1daaf' }),
        }),

        getPopularSeries: build.query({
            query: () => ({ url: 'https://api.themoviedb.org/3/discover/tv?api_key=010fbfb2693209806775526572b1daaf&first_air_date.gte=2015-01-01&first_air_date.lte=2024-01-01&include_adult=false&include_null_first_air_dates=false&page=1&sort_by=popularity.desc&with_origin_country=GB&with_origin_country=US' }),
        }),

        getSerieDetails: build.query({
            query: (id) => ({ url: `https://api.themoviedb.org/3/tv/${id}?api_key=010fbfb2693209806775526572b1daaf` }),
        }),

        getSerieActors: build.query({
            query: (id) => ({ url: `https://api.themoviedb.org/3/tv/${id}/credits?api_key=010fbfb2693209806775526572b1daaf` }),
        }),

        getSerieRecommendations: build.query({
            query: (id) => ({ url: `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=010fbfb2693209806775526572b1daaf` }),
        }),

        getSerieSeasons: build.query({
            query: (id) => ({ url: `https://api.themoviedb.org/3/tv/${id}/season?api_key=010fbfb2693209806775526572b1daaf` }),
        }),

        searchSeries: build.query({
            query: (title) => ({ url: `https://api.themoviedb.org/3/search/tv?query=${title}&api_key=010fbfb2693209806775526572b1daaf&include_adult=false&language=en-US&page=1` }),
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetTrendingSeriesQuery,
    useGetPopularSeriesQuery,
    useGetSerieActorsQuery,
    useGetSerieDetailsQuery,
    useGetSerieRecommendationsQuery,
    useSearchSeriesQuery
} = allSeriesApi