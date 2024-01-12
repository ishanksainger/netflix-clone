const express = require("express")
const router = express.Router()
const { getUserDetails, userLikedMovies,fetchLikedMovies, deleteLikedMovie } = require("../controllers/Profile")
const { auth } = require("../middlewares/auth")


router.get("/getUserDetails", auth, getUserDetails)
router.post("/getLikedMovies", auth, userLikedMovies)
router.get("/fetchLikedMovies", auth, fetchLikedMovies)
router.delete("/deleteLikedMovie", auth, deleteLikedMovie)
module.exports = router