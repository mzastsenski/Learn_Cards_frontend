import s from "./MainPage.module.scss";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import Triggers from "../../components/Triggers/Triggers";
import Form from "../../components/Form/Form";
import { words } from "../../data/defaultCards";
import { useEffect, useRef } from "react";
import { checkUser, getData } from "../../requests";
import { useSelector, useDispatch } from "react-redux";
import { setData, setCards, setCollection, logout } from "../../redux/data";

const App = () => {
  const user = useSelector((state) => state.user);
  const collection = useSelector((state) => state.collection);
  const dispatch = useDispatch();
  const effectRan = useRef(true);

  useEffect(() => {
    if (effectRan.current) {
      user ? check() : dispatch(setCards(words));
    }
    return () => (effectRan.current = false);
  }, [user, dispatch]);

  const check = () => {
    checkUser().then((res) => {
      if (res.status !== 200) dispatch(logout());
      else getData(user).then((res) => setRedux(res));
    });
  };

  const setRedux = (data) => {
    const cards = data.filter((e) => e.collection === collection);
    dispatch(setData(data));
    !cards[0] ? changeCollection(data) : dispatch(setCards(cards));
  };

  const changeCollection = (data) => {
    const arr = [];
    data.forEach((e) => {
      if (!arr.includes(e.collection)) arr.push(e.collection);
    });
    if (arr[0]) {
      const newCollecton = arr[0];
      dispatch(setCollection(newCollecton));
      const cards = data.filter((e) => e.collection === newCollecton);
      dispatch(setCards(cards));
    }
  };

  return (
    <div className={s.main_page}>
      <h2>{collection}</h2>
      <Form />
      <CardsContainer />
      <Triggers />
    </div>
  );
};

export default App;
