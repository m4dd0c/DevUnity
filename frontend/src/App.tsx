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
            <Route path="description" element={<Description />} />
            <Route path="describe" element={<Describe />} />
          </Route>
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
