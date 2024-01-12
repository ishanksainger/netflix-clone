import { toast } from "react-hot-toast"
import { setLoading, setToken } from "../../slices/authSlice"
import { apiConnector } from "../apiConnector"
import { userEndPoints } from "../moviesApi"
import { setUser } from "../../slices/profileSlice"
const { LOGIN_API, SIGNUP_API } = userEndPoints


export const signup = (firstName, lastName ,email, password, confirmPassword, navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                firstName, lastName ,email, password, confirmPassword
            })

            if (!response.data.success) throw new Error(response.data.message)

            toast.success("Signup Successfull")
            navigate("/login")

        } catch (error) {
            console.log("SIGNUP API ERROR............", error)
            toast.error("Signup Failed")
            navigate("/signup")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export const login = (email, password, navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", LOGIN_API, {
                email, password
            })

            if (!response.data.success) throw new Error(response.data.message)

            toast.success("Login Successfull")
            dispatch(setToken(response.data.token))
            dispatch(setUser(response.data.existingUser))
            localStorage.setItem("token", JSON.stringify(response.data.token))
            navigate("/my-profile")

        } catch (error) {
            console.log("LOGIN API ERROR............", error)
            toast.error("Login Failed")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function logout(navigate) {
    return (dispatch) => {
        dispatch(setToken(null))
        dispatch(setUser(null))
        localStorage.removeItem("token")
        toast.success("Logged Out")
        navigate("/")
    }
}