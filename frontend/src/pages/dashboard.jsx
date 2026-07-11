import {useEffect,useState} from "react";
import API from "../api/axios";

function Dashboard(){

const [progress,setProgress]=useState(null);

useEffect(()=>{
const loadProgress=async()=>{
try{
const res=await API.get("/progress");
setProgress(res.data);
}
catch(error){
console.log(error);
}
};

loadProgress();
},[]);


const solved=progress?.completedProblems?.length || 0;

const total=200;

const percent=Math.round((solved/total)*100);


return(
<div className="min-h-screen bg-black text-white p-10">

<h1 className="text-4xl font-bold mb-10">
Dashboard
</h1>


<div className="grid grid-cols-3 gap-5">


<div className="bg-gray-900 p-5 rounded-xl">

<h2>
Problems Solved
</h2>

<p className="text-3xl">
{solved}/{total}
</p>

</div>


<div className="bg-gray-900 p-5 rounded-xl">

<h2>
Completion
</h2>

<p className="text-3xl">
{percent}%
</p>

</div>


<div className="bg-gray-900 p-5 rounded-xl">

<h2>
Current Level
</h2>

<p className="text-3xl">
Beginner
</p>

</div>

</div>

</div>
);
}

export default Dashboard;
