
import express from "express";
import { auth } from "../middleware/auth.js";
import { getMovies, getMovieByID, createMovies, deleteMovieByID, updateMovieByID } from "../services/movies.service.js";


const router = express.Router()

router.get("/",  async function (request, response){
    if(request.query.rating){
      request.query.rating = +request.query.rating;
    }
  
    console.log(request.query);
  
    const allDatas = await getMovies(request);
    
    console.log(allDatas);
    
    response.send(allDatas)
  })
  
  
router.get("/:id", async function(request, response){
  
    const {id} = request.params
  
    console.log(request.params, id);
  
    const getSingleData = await getMovieByID(id)
    console.log(getSingleData)
  
   getSingleData ? response.send(getSingleData) : response.status(404).send({Message : "Data Not Found"});
  })
  
router.post("/", auth, async function(request, response){
  
    const createRequest = request.body;
    console.log(createRequest);
  
    const createData = await createMovies(createRequest);
  
    response.send(createData);
  })
  
  
router.delete("/:id", async function(request, response){
  
    const {id} = request.params
  
    console.log(request.params, id);
  
    const deleteData = await deleteMovieByID(id)
    console.log(deleteData)
  
    deleteData. deletedCount > 0 ? response.send({message: "Data Deleted Successfully"}) : response.status(404).send({Message : "Data Not Found"});
  })
  
  
  
router.put("/:id",  async function(request, response){
  
    const {id} = request.params
  
    console.log(request.params, id);
  
    const updateRequest = request.body
  
    const updateData = await updateMovieByID(id, updateRequest);
    console.log(updateData)
  
   response.send(updateData)
  })

export default router;
