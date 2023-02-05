
import { client } from "../index.js";
import bcrypt from "bcrypt";

export async function generateHashedPassword(password){
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(salt);    //// $2b$10$TH9fFODuNSI7c.AnX4h4Nu
  console.log(hashedPassword);   /////  $2b$10$TH9fFODuNSI7c.AnX4h4Nu/xtGvCmsUMy.qeG9OP4cm6lvZgfzcJe
  
  return hashedPassword

}


export async function signUp(getDetails) {
  return await client.db("Ragav").collection("users").insertOne(getDetails);
}

export async function usernameFind(username) {
  return await client.db("Ragav").collection("users").findOne({ username: username });
}
