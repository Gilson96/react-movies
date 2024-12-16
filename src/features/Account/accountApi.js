import { apiSlice } from '../apiSlice'

const accountApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({

        getAccountDetails: build.query({
            query: () => ({ url: 'https://react-movies-api-98105904ac05.herokuapp.com/user' }),
        }),

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

    }),
    overrideExisting: false,
})

export const {
    useGetAccountDetailsQuery,
    usePostToFavouriteMoviesMutation,
    usePostToWatchlistMoviesMutation,
    useRemoveFavouriteMoviesMutation,
    useRemoveWatchlistMoviesMutation,
} = accountApi