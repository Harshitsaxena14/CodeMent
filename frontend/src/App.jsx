import {Routes,Route} from "react-router-dom";
import Home from "./pages/home";
import Roadmap from "./pages/roadmap";
import TopicDetails from "./pages/topicdetails";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import AIMentor from "./pages/aimentor";

function App(){

return(
<>
<Navbar/>

<Routes>
<Route path="/" element={<Home/>}/>
<Route path="/roadmap" element={<Roadmap/>}/>
<Route path="/roadmap/:id" element={<TopicDetails/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/register" element={<Register/>}/>
<Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
<Route path="/ai" element={<ProtectedRoute><AIMentor/></ProtectedRoute>}/>
</Routes>


</>
);
}

export default App;