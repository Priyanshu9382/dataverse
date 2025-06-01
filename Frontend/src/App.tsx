import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RouteListener from "./components/RouteListener";
import Question from "./pages/Question";
import Landing from "./pages/Landing";
import Popular from "./pages/Popular";
import Categories from "./pages/Categories";
import Category from "./pages/Category";
import { RecoilRoot } from "recoil";
import Browse from "./pages/Browse";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserProtectedWrapper from "./pages/UserProtectedWrapper";
import Logout from "./pages/Logout";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <RouteListener />
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected routes */}
          <Route element={<UserProtectedWrapper />}>
            <Route path="/" element={<Landing />} />
            <Route path="/question/:id" element={<Question />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:id" element={<Category />} />
            <Route path="/browse/:id" element={<Browse />} />
            <Route path="/user/logout" element={<Logout />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
