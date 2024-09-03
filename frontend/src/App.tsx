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
import { SocketProvider } from "./context/useSocket";
import { Toaster } from "react-hot-toast";
import Protected from "./protected/Protected";

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

  console.log({ auth });
  return (
    <Router>
      <Toaster
        containerStyle={{
          zIndex: 99999999,
        }}
        toastOptions={{
          style: {
            backgroundColor: "black",
            color: "white",
            border: "1px solid rgba(255,255,255,0.2)",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
            fontSize: ".9rem",
          },
        }}
        position="bottom-right"
      />
      <SocketProvider>
        <Header user_id={user && user._id} auth={auth} setAuth={setAuth} />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />

          <Route path="/room">
            <Route path="" element={<Navigate to="create" />} />
            <Route path="join" element={<JoinRoom user={user} />} />
            <Route path="create" element={<CreateRoom />} />

            <Route path=":roomId">
              <Route
                path=""
                element={
                  <Protected auth={auth}>
                    <Playground user={user} />
                  </Protected>
                }
              />
              <Route
                path="about"
                element={
                  <Protected auth={auth}>
                    <Describe user={user} />
                  </Protected>
                }
              />
            </Route>
          </Route>

          <Route path="/search" element={<SearchUsers />} />

          <Route path="/user">
            <Route
              path="verify"
              element={
                <Protected auth={auth}>
                  <Verify />
                </Protected>
              }
            />

            <Route path=":userId">
              <Route
                path=""
                element={
                  <Protected auth={auth}>
                    <Profile user_id={user?._id} />
                  </Protected>
                }
              />

              <Route
                path="edit"
                element={
                  <Protected auth={auth}>
                    <EditProfile user={user} />
                  </Protected>
                }
              />
              <Route
                path="danger"
                element={
                  <Protected auth={auth}>
                    <DangerZone
                      setAuth={setAuth}
                      user_id={user && user._id}
                      username={user && user.username}
                    />
                  </Protected>
                }
              />
            </Route>
          </Route>

          <Route path="/password">
            <Route
              path="change"
              element={
                <Protected auth={auth}>
                  <ChangePassword />
                </Protected>
              }
            />
            <Route
              path="reset/:token"
              element={
                <Protected auth={!auth} redirect="/#hero">
                  <ResetPassword />
                </Protected>
              }
            />
            <Route
              path="forget"
              element={
                <Protected auth={!auth} redirect="/#hero">
                  <ForgetPassword />
                </Protected>
              }
            />
          </Route>

          <Route path="/auth">
            <Route path="" element={<Navigate to="signin" />} />
            {/* if user already authenticated then redirecting to home page */}
            <Route
              path="signin"
              element={
                <Protected auth={!auth} redirect="/#hero">
                  <Signin setAuth={setAuth} />
                </Protected>
              }
            />
            <Route
              path="signup"
              element={
                <Protected auth={!auth} redirect="/#hero">
                  <Signup setAuth={setAuth} />
                </Protected>
              }
            />
          </Route>

          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
        <Footer />
      </SocketProvider>
    </Router>
  );
}

export default App;
