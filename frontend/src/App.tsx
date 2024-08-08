import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Footer from "./components/layout/Footer";
import NotFound from "./screens/NotFound";
import Home from "./screens/Home";
import Playground from "./screens/Room/Playground";
import Contact from "./screens/Contact";
import About from "./screens/About";
import TermsConditions from "./screens/TermsConditions";
import PrivacyPolicy from "./screens/PrivacyPolicy";
import Header from "./components/layout/Header";
import CreateRoom from "./screens/CreateRoom";
import JoinRoom from "./screens/JoinRoom";
import Describe from "./screens/Room/Describe";
import Description from "./screens/Room/Description";
import "./prism.css";
import Profile from "./screens/user/Profile";
import EditProfile from "./screens/user/EditProfile";
import ForgetPassword from "./screens/user/ForgetPassword";
import ResetPassword from "./screens/user/ResetPassword";
import Signin from "./screens/user/Signin";
import Signup from "./screens/user/Signup";
import ChangePassword from "./screens/user/ChangePassword";
import DangerZone from "./screens/user/DangerZone";
import SearchUsers from "./screens/Search";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />

        <Route path="/room">
          <Route path="" element={<Navigate to="create" />} />
          <Route path="join" element={<JoinRoom />} />
          <Route path="create" element={<CreateRoom />} />

          <Route path=":id">
            <Route path="" element={<Playground />} />
            {/* TODO: May gonna change them according to backend later */}
            <Route path="description" element={<Description />} />
            <Route path="describe" element={<Describe />} />
          </Route>
        </Route>

        <Route path="/search" element={<SearchUsers />} />

        <Route path="/user">
          <Route path=":userId">
            <Route path="" element={<Profile />} />
            <Route path="edit" element={<EditProfile />} />
            <Route path="danger" element={<DangerZone />} />
          </Route>
        </Route>

        <Route path="/password">
          <Route path="forget" element={<ForgetPassword />} />
          <Route path="reset" element={<ResetPassword />} />
          <Route path="change" element={<ChangePassword />} />
        </Route>

        <Route path="/auth">
          <Route path="" element={<Navigate to="signin" />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
