import {useParams,useSearchParams} from "react-router-dom";
import {useState,useEffect} from "react";
import roadmap from "../data/roadmap";
import API from "../api/axios";

function TopicDetails(){
const {id}=useParams();
const [searchParams]=useSearchParams();
const currentProblem=searchParams.get("problem");
const topic=roadmap.find((t)=>t.id==id);

const [completed,setCompleted]=useState([]);

useEffect(()=>{
    const getProgress=async()=>{
        try{
            const res=await API.get("/progress");
            if(res.data){
                setCompleted(res.data.completedProblems);
            }
        }
        catch(error){
            console.log(error);
        }
    };
    getProgress();
},[]);

const toggleDone=async(questionId)=>{
    const updated=completed.includes(questionId)
    ? completed.filter((x)=>x!==questionId)
    : [...completed,questionId];

    setCompleted(updated);

    try{
        await API.post("/progress",{
            completedProblems:updated
        });
    }
    catch(error){
        console.log(error);
    }
};

if(!topic){
return(
<div className="min-h-screen bg-black text-white flex justify-center items-center">
Topic not found
</div>
);
}

return(
<div className="min-h-screen bg-black text-white p-10">
<h1 className="text-4xl font-bold mb-8">{topic.title}</h1>

<div className="space-y-5">
{topic.questions.map((q)=>(
<div
key={q.id}
className={
q.id===currentProblem
?"p-5 rounded-xl border-2 border-green-500 bg-green-900"
:"p-5 rounded-xl border border-gray-700 bg-gray-900"
}
>

<div className="flex justify-between items-center">
<div>
<h2 className="text-xl font-semibold">{q.title}</h2>
<p className="text-gray-400">{q.difficulty}</p>
</div>

<input
	type="checkbox"
checked={completed.includes(q.id)}
onChange={()=>toggleDone(q.id)}
className="w-5 h-5"
/>

</div>
</div>
))}
</div>
</div>
);
}

export default TopicDetails;
