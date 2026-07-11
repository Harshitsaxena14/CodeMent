const express=require("express");

const {
 getProgress,
 updateProgress,
 trackProblem
}=require("../controllers/progresscontroller");

const protect=require("../middleware/authmiddleware");

const router=express.Router();

router.get("/",protect,getProgress);
router.post("/",protect,updateProgress);
router.post("/track",protect,trackProblem);

module.exports=router;