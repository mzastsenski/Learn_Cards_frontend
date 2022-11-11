import s from "./App.module.css";
import CardsContainer from "../CardsContainer/CardsContainer";
import CardsList from "../Collections/Collections";
import Triggers from "../Triggers/Triggers";
import Form from "../Form/Form";
import { words } from "../data/words";
import { useEffect } from "react";
import { getData } from "../../Ajax";
import { useSelector, useDispatch } from "react-redux";
import { setData, setCards, setCollection } from "../../redux/data";

const App = () => {
  const user = useSelector((state) => state.user);
  const collection = useSelector((state) => state.collection);
  const dispatch = useDispatch();

  useEffect(() => {
    user
      ? getData(user).then((res) => setRedux(res))
      : dispatch(setCards(words));
  }, [user]);

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
    <div className={s.app}>
      <h2>{collection}</h2>
      <Form />
      <CardsContainer />
      <Triggers />
      <CardsList />
    </div>
  );
};

export default App;
