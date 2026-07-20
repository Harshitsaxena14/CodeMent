const Progress=require("../models/progressmodel");

const getProgress=async(req,res)=>{
    try{
        const progress=await Progress.findOne({user:req.user});
        res.json(progress);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
};

const updateProgress=async(req,res)=>{
    try{
        const {completedProblems,currentTopic,percentage}=req.body;
        let progress=await Progress.findOne({user:req.user});
        if(progress){
            progress.completedProblems=completedProblems;
            progress.currentTopic=currentTopic;
            progress.percentage=percentage;
            await progress.save();
        }
        else{
            progress=await Progress.create({
                user:req.user,
                completedProblems,
                currentTopic,
                percentage
            });
        }
        res.json(progress);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
};
const trackProblem=async(req,res)=>{
 try{
  const {slug,title,topic,difficulty,status,timeSpent}=req.body;

  let progress=await Progress.findOne({
   user:req.user
  });

  if(!progress){
   progress=await Progress.create({
    user:req.user,
    completedProblems:[],
    problemHistory:[]
   });
  }

  const existing=progress.problemHistory.find(
   p=>p.slug===slug
  );

  if(existing){
   existing.attempts+=1;
   existing.timeSpent+=timeSpent;
   existing.status=status;

   if(status==="solved"){
    existing.solvedAt=new Date();
   }
  }else{
   progress.problemHistory.push({
    slug,
    title,
    topic,
    difficulty,
    status,
    timeSpent,
    solvedAt:status==="solved"?new Date():null
   });
  }

  if (status === "solved" && !progress.completedProblems.includes(slug)) {
    progress.completedProblems.push(slug);
  }

  await progress.save();

  res.json({
   message:"Problem tracked",
   progress
  });

 }catch(error){
  res.status(500).json({
   message:error.message
  });
 }
};

module.exports={
 getProgress,
 updateProgress,
 trackProblem
};