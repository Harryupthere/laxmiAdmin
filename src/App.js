import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SideDrawer from "./components/dashboard/SideDrawer";
import Signup from "./components/Signup";
import Home from "./components/dashboard/Home";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import AstroPanel from "./components/dashboard/AstroPanel";
import ICOPanel from "./components/dashboard/ICOPanel";
import StakePanel from "./components/dashboard/StakePanel";
import Users from "./components/dashboard/Users";
import PreICOPanel from "./components/dashboard/PreICOPanel";

function App() {
  return (
    <>
      {/* <WagmiConfig config={wagmiConfig}> */}
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="forgotPassword" element={<ForgotPassword />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />

            <Route path="signup" element={<Signup />} />
            <Route path="Dashboard" element={<SideDrawer />}>
              <Route path="home" element={<Home />} />
              <Route
                path="astro-panel"
                element={<AstroPanel />}
              />
              <Route path="ico-panel" element={<ICOPanel />} />
              <Route path="pre-ico-panel" element={<PreICOPanel />} />

              <Route path="stake-panel" element={<StakePanel />} />
              <Route path="users" element={<Users />} />
            </Route>
          </Routes>
        </Router>
    </>
  );
}

export default App;
