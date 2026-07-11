const express=require("express");
const {askAI}=require("../controllers/aicontroller");

const router=express.Router();

router.post("/",askAI);

module.exports=router;
