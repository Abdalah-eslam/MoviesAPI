import express from 'express';
import {config} from 'dotenv';
import { connectDB } from './config/dbConfig.js';
import authRoute from './routes/Auth_Route.js';
import moviesRoute from './routes/Movies_route.js';
import watchListRoute from './routes/watchList_route.js';
config();
connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use("/api/auth",authRoute);
app.use("/api/movies",moviesRoute);
app.use("/api/watchlist", watchListRoute);
const port = process.env.PORT || 5001;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
}
)

