import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import MainPage from "./pages/MainPage/MainPage";
import Layout from "./components/Layout/Layout";
import { useEffect, useRef } from "react";
import { getData } from "./requests";
import { useSelector, useDispatch } from "react-redux";
import { setDefault } from "./redux/data";

const App = () => {
  const { user, collection } = useSelector((state) => state);
  const dispatch = useDispatch();
  const effectRan = useRef(false); // first load

  useEffect(() => {
    if (!effectRan.current) {
      user ? dispatch(getData(user)) : dispatch(setDefault());
    }
    return () => (effectRan.current = true);
  }, [user, collection, dispatch]);

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

export default App;
