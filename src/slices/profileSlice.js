import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:null,
    loading:false
}

const profileSlice=createSlice({
    name:"profile",
    initialState:initialState,
    reducers:{
        setLoading(state,action){
            state.loading=action.payload
        },
        setUser(state,action){
            state.user=action.payload
        }
    }
})

export const {setUser,setLoading}=profileSlice.actions
export default profileSlice.reducer
