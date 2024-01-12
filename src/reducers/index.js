import {combineReducers} from "@reduxjs/toolkit"
import movieReducer from "../slices/movieSlice"
import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice"

const rootReducer=combineReducers({
    movie:movieReducer,
    auth: authReducer,
    profile: profileReducer,
})

export default rootReducer