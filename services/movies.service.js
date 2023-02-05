

import { client } from "../index.js";

export async function updateMovieByID(id, updateRequest) {
  return await client.db("Ragav").collection("movies").updateOne({ id: id }, { $set: updateRequest });
}
export async function deleteMovieByID(id) {
  return await client.db("Ragav").collection("movies").deleteOne({ id: id });
}
export async function createMovies(createRequest) {
  return await client.db("Ragav").collection("movies").insertMany(createRequest);
}
export async function getMovieByID(id) {
  return await client.db("Ragav").collection("movies").findOne({ id: id });
}
export async function getMovies(request) {
  return await client.db("Ragav").collection("movies").find(request.query).toArray();
}