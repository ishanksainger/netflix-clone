const TMDB_BASE_URL = process.env.REACT_APP_BASE_URL_TMDB;
const TMDB_API_KEY = process.env.REACT_APP_API_KEY_TMDB;
const SERVER_BASE_URL = process.env.REACT_APP_BASE_URL_SERVER;

export const endPoints={
    POPULAR_MOVIE:`${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`,
    TOP_RATED:`${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}`,
    TRENDING_MOVIE:`${TMDB_BASE_URL}/trending/movie/day?api_key=${TMDB_API_KEY}`,
    UPCOMING_MOVIE:`${TMDB_BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}`,
    COMEDY_MOVIE:`${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=comedy`
}
export const userEndPoints={
    SIGNUP_API: SERVER_BASE_URL + "/auth/signup",
    LOGIN_API: SERVER_BASE_URL + "/auth/login"
}

export const profileEndPoints={
    GET_USER_DETAILS_API: SERVER_BASE_URL + "/profile/getUserDetails",
    GET_USER_LIKED_MOVIES: SERVER_BASE_URL + "/profile/getLikedMovies",
    FETCH_USER_LIKED_MOVIES:SERVER_BASE_URL+ "/profile/fetchLikedMovies",
    DELETE_LIKED_MOVIES:SERVER_BASE_URL + "/profile/deleteLikedMovie"
}