import s from "./MainPage.module.scss";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import Triggers from "../../components/Triggers/Triggers";
import Form from "../../components/Form/Form";
import { useSelector } from "react-redux";

const MainPage = () => {
  const collection = useSelector((state) => state.collection);
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
