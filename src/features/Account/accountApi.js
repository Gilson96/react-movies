import { apiSlice } from '../apiSlice'

const accountApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({

        getAccountDetails: build.query({
            query: () => ({ url: 'https://react-movies-api-98105904ac05.herokuapp.com/user' }),
        }),

        // movies

        // Add movie to watchlist
        postToWatchlistMovies: build.mutation({
            query(data) {
                const { id, body } = data
                return {
                    url: `https://react-movies-api-98105904ac05.herokuapp.com/user/${id}/movies/watchlist`,
                    method: 'POST',
                    body
                }
            }
        }),

        // Remove movie from watchlist
        removeWatchlistMovies: build.mutation({
            query(data) {
                const { id, movieId } = data
                return {
                    url: `https://react-movies-api-98105904ac05.herokuapp.com/user/${id}/movies/watchlist/${movieId}`,
                    method: 'POST',
                }
            }
        }),
        
        // Add movie to favourites
        postToFavouriteMovies: build.mutation({
            query(data) {
                const { id, body } = data
                return {
                    url: `https://react-movies-api-98105904ac05.herokuapp.com/user/${id}/movies/favourite`,
                    method: 'POST',
                    body
                }
            }
        }),

        // Remove movie from favourite
        removeFavouriteMovies: build.mutation({
            query(data) {
                const { id, movieId } = data
                return {
                    url: `https://react-movies-api-98105904ac05.herokuapp.com/user/${id}/movies/favourite/${movieId}`,
                    method: 'POST',
                }
            }
        }),


        // series

        // Add serie to watchlist
        postToWatchlistSeries: build.mutation({
            query(data) {
                const { id, body } = data
                return {
                    url: `https://react-movies-api-98105904ac05.herokuapp.com/user/${id}/series/watchlist`,
                    method: 'POST',
                    body
                }
            }
        }),

        // Remove serie from watchlist
        removeWatchlistSeries: build.mutation({
            query(data) {
                const { id, serieId } = data
                return {
                    url: `https://react-movies-api-98105904ac05.herokuapp.com/user/${id}/series/watchlist/${serieId}`,
                    method: 'POST',
                }
            }
        }),


        // Add serie to favourite 
        postToFavouriteSeries: build.mutation({
            query(data) {
                const { id, body } = data
                return {
                    url: `https://react-movies-api-98105904ac05.herokuapp.com/user/${id}/series/favourite`,
                    method: 'POST',
                    body
                }
            }
        }),

        // Remove serie from favourite
        removeFavouriteSeries: build.mutation({
            query(data) {
                const { id, serieId } = data
                return {
                    url: `https://react-movies-api-98105904ac05.herokuapp.com/user/${id}/series/favourite/${serieId}`,
                    method: 'POST',
                }
            }
        }),


    }),
    overrideExisting: false,
})

export const {
    useGetAccountDetailsQuery,
    usePostToFavouriteMoviesMutation,
    usePostToFavouriteSeriesMutation,
    usePostToWatchlistMoviesMutation,
    usePostToWatchlistSeriesMutation,
    useRemoveFavouriteMoviesMutation,
    useRemoveFavouriteSeriesMutation,
    useRemoveWatchlistMoviesMutation,
    useRemoveWatchlistSeriesMutation
} = accountApi