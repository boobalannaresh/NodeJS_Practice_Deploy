
import { client } from "../index.js";
import { ObjectId } from "mongodb";



export async function updateMovieByID(id, updateRequest) {
  return await client.db("Ragav").collection("movies").updateOne({ _id:new ObjectId(id)}, { $set: updateRequest });
}
export async function deleteMovieByID(id) {
  return await client.db("Ragav").collection("movies").deleteOne({ _id: new ObjectId(id)});
}
export async function createMovies(createRequest) {
  return await client.db("Ragav").collection("movies").insertMany(createRequest);
}
export async function getMovieByID(id) {
  // console.log("****", id)
  return await client.db("Ragav").collection("movies").findOne({ _id :new ObjectId(id) });
}
export async function getMovies(request) {
  return await client.db("Ragav").collection("movies").find(request.query).toArray();
}