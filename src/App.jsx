import { Routes, Route } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import MainPage from "./pages/MainPage/MainPage";
import Header from "./components/Header/Header";

const Router = () => {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="Login" element={<Login />} />
        <Route path="Signup" element={<Signup />} />
      </Routes>
    </HashRouter>
  );
};

export default Router;
