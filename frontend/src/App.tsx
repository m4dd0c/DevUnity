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
import Describe from "./screens/Room/About";
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
import Verify from "./screens/user/Verify";
import { useQuery } from "@tanstack/react-query";
import { getMeAction } from "./lib/actions/userAction";
import { KEYS } from "./lib/utils";
import { useEffect, useState } from "react";

function App() {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const { refetch, data } = useQuery({
    queryFn: getMeAction,
    queryKey: [KEYS.GET_ME],
  });
  // getting auth
  useEffect(() => {
    if (data) {
      if (data.data) {
        setUser(data.data);
        setAuth(true);
      }
    }
  }, [data]);
  // getting data onload
  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <Router>
      <Header userId={user && user._id} auth={auth} setAuth={setAuth} />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />

        <Route path="/room">
          <Route path="" element={<Navigate to="create" />} />
          <Route path="join" element={<JoinRoom />} />
          <Route path="create" element={<CreateRoom />} />

          <Route path=":roomId">
            <Route path="" element={<Playground />} />
            <Route path="about" element={<Describe user={user} />} />
          </Route>
        </Route>

        <Route path="/search" element={<SearchUsers />} />

        <Route path="/user">
          <Route path="verify" element={<Verify />} />
          <Route path=":userId">
            <Route path="" element={<Profile user_id={user?._id} />} />
            <Route path="edit" element={<EditProfile user={user} />} />
            <Route
              path="danger"
              element={<DangerZone username={user && user.username} />}
            />
          </Route>
        </Route>

        <Route path="/password">
          <Route path="forget" element={<ForgetPassword />} />
          <Route path="reset/:token" element={<ResetPassword />} />
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
