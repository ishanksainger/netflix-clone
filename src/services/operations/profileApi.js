import toast from "react-hot-toast"
import { setLoading, setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { profileEndPoints } from "../moviesApi"
import { logout } from "./authApi"

const { GET_USER_DETAILS_API, GET_USER_LIKED_MOVIES, FETCH_USER_LIKED_MOVIES,DELETE_LIKED_MOVIES } = profileEndPoints

export function getUserDetails(token, navigate) {
    return async (dispatch) => {

        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
                Authorization: `Bearer ${token}`,
            })
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            dispatch(setUser(response.data.data))
        } catch (error) {
            dispatch(logout(navigate))
            console.log("GET_USER_DETAILS API ERROR............", error)
            toast.error("Could Not Get User Details")
        }
        toast.dismiss(toastId)
        dispatch(setLoading(false))
    }

}
export function userLikedMovies(token, likedMovies,movieID) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", GET_USER_LIKED_MOVIES, { likedMovies }, {
                Authorization: `Bearer ${token}`,
            })
            if (!response?.data?.success) {
                throw new Error("Could Not Like Movie")
            }
            const isLiked = likedMovies.some((likedMovie) => likedMovie.id === movieID);
            const action = isLiked ? 'Liked' : 'Unliked';
            toast.success(`${action} Movies Successfully`);

            dispatch(setUser(response.data.userMovies));

        } catch (error) {
            console.log("ERROR............", error)
            toast.error(error.message)
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}
export const fetchLikedMovies = async (token) => {
    const toastId = toast.loading("Loading...")
    let result = null
    try {
        const response = await apiConnector("GET", FETCH_USER_LIKED_MOVIES, null,{
            Authorization: `Bearer ${token}`,
        })
        if (!response?.data?.success) {
            throw new Error("Unable to fetch User Liked Movies")
        }
        result=response.data.movies

    } catch (error) {
        console.log("ERROR............", error)
    }
    toast.dismiss(toastId)
    //   dispatch(setLoading(false));
    return result
}
export const deleteMovie = async (token, movieID) => {
    const toastId = toast.loading("Loading...")
   
    let result = null
    try {
        const response = await apiConnector("DELETE", DELETE_LIKED_MOVIES, {movieID},{
            Authorization: `Bearer ${token}`,
        })
        if (!response?.data?.success) {
            throw new Error("Unable to fetch User Liked Movies")
        }
        result=response.data.movies

    } catch (error) {
        console.log("ERROR............", error)
    }
    toast.dismiss(toastId)
    //   dispatch(setLoading(false));
    return result
}