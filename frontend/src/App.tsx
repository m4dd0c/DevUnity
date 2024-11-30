import { lazy, Suspense, useEffect, useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMeAction } from "./lib/actions/userAction";
import { KEYS } from "./lib/utils";
import { Toaster } from "react-hot-toast";
import Protected from "./protected/Protected";
import "./prism.css";

import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";

import { SocketProvider } from "./context/SocketContext";
import Loader from "./components/layout/Loadings/Loader";

// Lazy load components
const NotFound = lazy(() => import("./screens/NotFound"));
const Home = lazy(() => import("./screens/Home"));
const Contact = lazy(() => import("./screens/Contact"));
const About = lazy(() => import("./screens/About"));
const TermsConditions = lazy(() => import("./screens/TermsConditions"));
const PrivacyPolicy = lazy(() => import("./screens/PrivacyPolicy"));
const CreateRoom = lazy(() => import("./screens/CreateRoom"));
const JoinRoom = lazy(() => import("./screens/JoinRoom"));
const ForgetPassword = lazy(() => import("./screens/user/ForgetPassword"));
const ResetPassword = lazy(() => import("./screens/user/ResetPassword"));
const Signin = lazy(() => import("./screens/user/Signin"));
const Signup = lazy(() => import("./screens/user/Signup"));
const ChangePassword = lazy(() => import("./screens/user/ChangePassword"));
const DangerZone = lazy(() => import("./screens/user/DangerZone"));
const Verify = lazy(() => import("./screens/user/Verify"));
const Describe = lazy(() => import("./screens/Room/About"));
const Playground = lazy(() => import("./screens/Room/Playground"));
const Profile = lazy(() => import("./screens/user/Profile"));
const EditProfile = lazy(() => import("./screens/user/EditProfile"));
const Search = lazy(() => import("./screens/Search"));

function App() {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const { refetch, data } = useQuery({
    queryFn: getMeAction,
    queryKey: [KEYS.GET_ME],
  });

  // Get authentication status and user info
  useEffect(() => {
    if (data) {
      if (data.data) {
        setUser(data.data);
        setAuth(true);
      }
    }
  }, [data]);

  // Fetch user data on load
  useEffect(() => {
    refetch();
  }, [refetch]);

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
        <Suspense
          fallback={
            <div className="grid h-screen w-full place-items-center bg-black">
              <Loader />
            </div>
          }
        >
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

            <Route path="/search" element={<Search />} />

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
        </Suspense>
        <Footer />
      </SocketProvider>
    </Router>
  );
}

export default App;
