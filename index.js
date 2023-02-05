
import express from "express";
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import moviesRouter from "./routes/movies.route.js";
import usersRouter from "./routes/users.route.js";
import bcrypt from "bcrypt";
import cors from "cors";


dotenv.config();
const app = express();

const PORT = process.env.PORT;  //// Auto Assign Port

//// Mongo Connection
const MONGO_URL = process.env.MONGO_URL  
//// mongodb+srv://username:<password>@databases.lyvnjh1.mongodb.net/?retryWrites=true&w=majority
const client = new MongoClient(MONGO_URL); 
//// top-level await
await client.connect();
console.log("Mongo is Connected Successfully !!!");

//// XML Json Text
//// middleware - express.jsn() inbuilt middleware - JSON ---> JS Object
//// app.use --> Intercepts --> applies express.json() ( Inbuilt middleware )
app.use(express.json());
app.use(cors())

app.get("/", function (request, response) {
  response.send(" Hello World 🙋‍♂️, 🌏 🎊✨🤩");
});

app.use("/movies", moviesRouter);

app.use("/users", usersRouter);


app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

export { client };