import { Routes, Route } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import App from "../App/App";
import Header from "../Header/Header";

const Router = () => {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="Login" element={<Login />} />
        <Route path="Signup" element={<Signup />} />
      </Routes>
    </HashRouter>
  );
};

export default Router;
