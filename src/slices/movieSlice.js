import { createSlice } from "@reduxjs/toolkit";

const initialState={
    topRated:null,
    popular:null,
    trending:null,
    comedy:null,
    upcoming:null
}
const movieSlice=createSlice({
    name: "movie",
    initialState,
    reducers:{
        setTopRated:(state,action)=>{
            state.topRated=action.payload;
        },
        setPopular:(state,action)=>{
            state.popular=action.payload;
        },
        setTrending:(state,action)=>{
            state.trending=action.payload;
        },
        setComedy:(state,action)=>{
            state.comedy=action.payload;
        },
        setUpcoming:(state,action)=>{
            state.upcoming=action.payload;
        }
    }
})

export const{setTopRated, setPopular,setTrending,setComedy, setUpcoming}=movieSlice.actions

export default movieSlice.reducer