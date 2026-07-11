import {Link,useNavigate} from "react-router-dom";
import {useState} from "react";

function Navbar(){


const navigate=useNavigate();
const [token,setToken]=useState(localStorage.getItem("token"));

const logout=()=>{
localStorage.removeItem("token");
setToken(null);
navigate("/login");
};

return(
<div className="flex justify-between p-5 bg-gray-900 text-white">

<h1 className="font-bold text-xl">
CodeMent
</h1>

<div className="flex gap-5">

<Link to="/">Home</Link>
<Link to="/roadmap">Roadmap</Link>

{token ? (
<>
<Link to="/dashboard">Dashboard</Link>
<Link to="/ai">AI Mentor</Link>
<button onClick={logout}>Logout</button>
</>
):(
<>
<Link to="/login">Login</Link>
<Link to="/register">Register</Link>
</>
)}

</div>
</div>
);
}

export default Navbar;