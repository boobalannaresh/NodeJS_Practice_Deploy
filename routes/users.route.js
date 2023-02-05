
import express from "express";
import { generateHashedPassword, signUp } from "../services/users.service.js";
import { usernameFind } from "../services/users.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const router = express.Router()
  
  router.post("/signup", async function(request, response){

    const { username, password } = request.body;

    const userFromDB = await usernameFind(username); 
     console.log(userFromDB);
    
    if (userFromDB) {
      response.status(400).send({ message : "Username already exists"})
    } else if (password.length <8) {
      response.status(400).send({ message : "Password must be give at least 8 characters"})
    } else {
      const hashedPassword = await generateHashedPassword(password)

      const signUpData = await signUp({ username : username, password : hashedPassword });

      response.send(signUpData);

    }
    
  })


  router.post("/login", async function(request, response){

    const { username, password } = request.body;

    const userFromDB = await usernameFind(username); 
     console.log(userFromDB);
    
    if (!userFromDB) {
      response.status(401).send({ message : "Invalid Credentials"})
    } else {

      const storedDBPassword = userFromDB.password;
      const isPasswordCheck = await bcrypt.compare(password, storedDBPassword);
      console.log(isPasswordCheck);
      
      if (isPasswordCheck) {
        const token = jwt.sign({ id : userFromDB._id }, process.env.SECRET_KEY );
        response.send({ message : "Successful login", token : token });
      } else {
        response.status(401).send({ message: "Invalid Credentials"});
      }

    }
    
  })
  
export default router;





