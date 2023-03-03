import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import MainPage from "./pages/MainPage/MainPage";
import Layout from "./components/Layout/Layout";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="Login" element={<Login />} />
        <Route path="Signup" element={<Signup />} />{" "}
      </Route>
    </Routes>
  );
};

export default Router;
