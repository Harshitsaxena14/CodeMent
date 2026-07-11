import {useState} from "react";
import API from "../api/axios";

function Register(){
const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const handleRegister=async()=>{
    try{
        const res=await API.post("/auth/register",{
            name,
            email,
            password
        });
        alert(res.data.message);
    }
    catch(error){
        alert(error.response?.data?.message || "Register failed");
    }
};

return(
<div>
<h1>Register</h1>

<input
placeholder="Name"
onChange={(e)=>setName(e.target.value)}
/>

<input
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button onClick={handleRegister}>
Register
</button>

</div>
);
}

export default Register;
