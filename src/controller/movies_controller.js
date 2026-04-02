

import {prisma} from "../config/dbConfig.js";
const GetMovies = async (req, res) => {
    const movies = await prisma.movie.findMany();
    return res.status(200).json({ message: "success", data: movies });    
};

const GetMoviesWatchList = async (req, res) => {
    const userId = req.user.id;
    const watchListItems = await prisma.user.findUnique({
        where: { id: userId },
            include: {
                watchlistItems: {
                select: {
                    movie: {          
                    select: {
                        title: true 
                    }
                    }
                }
                }
            } 
    });
    // const movies = watchListItems.map(item => item.movie);
    return res.status(200).json({ message: "success", data: watchListItems });
}



export { GetMovies , GetMoviesWatchList };