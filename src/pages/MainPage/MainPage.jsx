import s from "./MainPage.module.scss";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import Triggers from "../../components/Triggers/Triggers";
import Form from "../../components/Form/Form";
import { words } from "../../data/defaultCards";
import { useEffect, useCallback, useRef } from "react";
import { checkUser } from "../../requests";
import { useSelector, useDispatch } from "react-redux";
import { setCards, setCollection } from "../../redux/data";

const App = () => {
  const user = useSelector((state) => state.user);
  const collection = useSelector((state) => state.collection);
  const dispatch = useDispatch();
  const effectRan = useRef(true);

  const changeCollection = useCallback((data) => {
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
  }, [dispatch]);

  useEffect(() => {
    if (effectRan.current) {
      user
        ? checkUser(user, collection, changeCollection, dispatch)
        : dispatch(setCards(words));
    }
    return () => (effectRan.current = false);
  }, [user, collection, changeCollection, dispatch]);

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
