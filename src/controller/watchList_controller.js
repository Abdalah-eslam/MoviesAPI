
import {prisma} from "../config/dbConfig.js";
const AddMovieToWatchList =async (req, res) => {
    const { movieId , status , rating , notes } = req.body;
    const movie = await prisma.movie.findUnique({
        where: {
            id: movieId,        
        }
    });
    if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
    }
    const existingInWatchList = await prisma.watchlistItem.findUnique({
        where: {
            userId_movieId: {
                userId: req.user.id,
                movieId: movieId
            }
        }
    });
    if (existingInWatchList) {
        return res.status(400).json({ message: "Movie already in watch list" });
    }
    const watchList = await prisma.watchlistItem.create({
        data: {
            userId: req.user.id,
            movieId: movieId,
            status: status || "PLANNED",
            rating: rating,
            notes: notes
        }
    });
    return res.status(201).json({
        message : "success",
        data : {
            watchList
        }
    });
}
const deleteMovieFromWatchList = async (req, res) => {
    const { id } = req.params;
    const watchListItem = await prisma.watchlistItem.findUnique({
        where: {
            id:id,
        }
    });
    if (!watchListItem) {
        return res.status(404).json({ message: "Watch list item not found" });
    }  
    if (watchListItem.userId !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized" });
    }
    await prisma.watchlistItem.delete({
        where: {
            id:id,
        }
    });
    return res.status(200).json({ message: "success" });
    
}
const UpdateWatchListItem = async (req, res) => {
    const { id } = req.params;
    const { status , rating , notes } = req.body;
    const watchListItem = await prisma.watchlistItem.findUnique({
        where: {
            id:id,
        }
    });
    if (!watchListItem) {
        return res.status(404).json({ message: "Watch list item not found" });
    }  
    if (watchListItem.userId !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized" });
    }
    const updatedWatchListItem = await prisma.watchlistItem.update({
        where: {
            id:id,
        },
        data: {
            status: status,
            rating: rating,
            notes: notes
        }
    });
    return res.status(200).json({
        message : "success",
        data : {
            watchList :updatedWatchListItem
        }
    });
}
export { AddMovieToWatchList ,deleteMovieFromWatchList , UpdateWatchListItem};