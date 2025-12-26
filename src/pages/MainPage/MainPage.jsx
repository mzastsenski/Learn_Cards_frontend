import s from "./MainPage.module.scss";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import Triggers from "../../components/Triggers/Triggers";
import Form from "../../components/Form/Form";
import { defaultCards } from "../../data/defaultCards";
import { useEffect, useRef } from "react";
import { getData } from "../../requests";
import { useSelector, useDispatch } from "react-redux";
import { setCards } from "../../redux/data";

const MainPage = () => {
  const user = useSelector((state) => state.user);
  const collection = useSelector((state) => state.collection);
  const dispatch = useDispatch();
  const effectRan = useRef(true);

  useEffect(() => {
    if (effectRan.current) {
      user
        ? getData(user, collection, dispatch)
        : dispatch(setCards(defaultCards));
    }
    return () => (effectRan.current = false);
  }, [user, collection, dispatch]);

  return (
    <div className={s.main_page}>
      <h2>{collection}</h2>
      <Form />
      <CardsContainer />
      <Triggers />
    </div>
  );
};

export default MainPage;
