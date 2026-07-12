import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Roadmap from "./pages/roadmap";
import TopicDetails from "./pages/topicdetails";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AIMentor from "./pages/aimentor";
import Insights from "./pages/insights";
import Revision from "./pages/revision";
import MissionPlanner from "./pages/missionplanner";
import SidebarLayout from "./components/SidebarLayout";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Authenticated Workspace Pages */}
        <Route element={<ProtectedRoute><SidebarLayout /></ProtectedRoute>}>
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/roadmap/:id" element={<TopicDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ai" element={<AIMentor />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/revision" element={<Revision />} />
          <Route path="/mission" element={<MissionPlanner />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;