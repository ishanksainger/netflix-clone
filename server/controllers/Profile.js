const User = require("../models/User");

exports.getUserDetails = async (req, res) => {
    try {
        const id = req.user.id
        const userDetails = await User.findById(id)
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }
        res.status(200).json({
            success: true,
            message: "User data fetched Successfully",
            data: userDetails,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.userLikedMovies = async (req, res) => {
    try {
        const id = req.user.id
        const  likedMovies  = req.body.likedMovies
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        user.likedMovies = likedMovies;
        await user.save();
       

        res.status(200).json({
            success: true,
            message: 'Liked movies updated successfully',
            userMovies:user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.fetchLikedMovies = async (req, res) => {
    try {
        const id = req.user.id
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }
        res.status(200).json({
            success: true,
            message: 'Liked movies updated successfully',
            movies:user.likedMovies
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
exports.deleteLikedMovie = async (req, res) => {
    try {
        const id = req.user.id
        const {movieID}=req.body
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }
        const movieIndex = user.likedMovies.findIndex((movie) => movie.id == movieID);
        // If the movie is found, remove it from the likedMovies array
        if (movieIndex !== -1) {
            user.likedMovies.splice(movieIndex, 1);
            await user.save();
        }

        res.status(200).json({
            success: true,
            message: 'Liked movie deleted successfully',
            movies: user.likedMovies,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
