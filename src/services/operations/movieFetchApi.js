import axios from "axios";
import { endPoints } from "../moviesApi";


const{
    POPULAR_MOVIE,
    TOP_RATED,
    TRENDING_MOVIE,
    UPCOMING_MOVIE,
    COMEDY_MOVIE
}=endPoints

export const fetchPopular=async()=>{
    try {
        const response=await axios(POPULAR_MOVIE);
        if (!response.data.results) {
            throw new Error("Not able to fetch Results")
        }
        return response.data.results;
    } catch (error) {
        console.log("Not able to fetch movies",error.message);
    }
  }
  export const fetchTopRated=async()=>{
    try {
        const response=await axios(TOP_RATED);
        
        if (!response.data.results) {
            throw new Error("Not able to fetch Results")
          }
          return response.data.results;

    } catch (error) {
        console.log("Not able to fetch movies",error.message);
    }
  }
  export const fetchTrending=async()=>{
    try {
        const response=await axios(TRENDING_MOVIE);
        if (!response.data.results) {
            throw new Error("Not able to fetch Results")
          }
          return response.data.results;

    } catch (error) {
        console.log("Not able to fetch movies",error.message);
    }
  }
  export const fetchUpcoming=async()=>{
    try {
        const response=await axios(UPCOMING_MOVIE);
        
        if (!response.data.results) {
            throw new Error("Not able to fetch Results")
          }
          return response.data.results;

    } catch (error) {
        console.log("Not able to fetch movies",error.message);
    }
  }
  export const fetchComedy=async()=>{
    try {
        const response=await axios(COMEDY_MOVIE);
        
        if (!response.data.results) {
            throw new Error("Not able to fetch Results")
          }
          return response.data.results;

    } catch (error) {
        console.log("Not able to fetch movies",error.message);
    }
  }