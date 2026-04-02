import express from "express";
import { GetMovies , GetMoviesWatchList } from "../controller/movies_controller.js";
import { AuthMiddleware } from "../middleware/AuthMiddleware.js";
const router = express.Router();
router.use(AuthMiddleware);
router.get("/", GetMovies);
router.get("/MyWatchList", GetMoviesWatchList);

export default router;