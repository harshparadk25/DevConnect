import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProjectDetails from "./pages/ProjectDetails";
import AuthForm from "./pages/AuthForm";
import Dashboard from "./pages/DashBoard"; 
import UpdateProfile from "./pages/UpdateProfile"; 
import MyProject from "./pages/MyProject";
import AllProject from "./pages/AllProject";
import AddProject from "./pages/AddProject";
import Profile from "./pages/Profile";
import PrivateRoute from "./routes/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import SearchResultsPage from "./pages/SearchResultsPage"
import DashboardLayout from "./components/layout/DashBoardLayout";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          
          <Route path="/auth" element={<AuthForm />} />

          
          <Route
            path="/"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            
            <Route index element={<Dashboard />} />
             <Route path="my-projects" element={<MyProject />} />
             <Route path="all-projects" element={<AllProject />} />
            <Route path="add-project" element={<AddProject />} />
            <Route path="profile" element={<Profile />} />
            <Route path="update-profile" element={<UpdateProfile />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
          </Route>

          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
