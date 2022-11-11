import Card from "../Card/Card";
import s from "./CardsContainer.module.css";
import { useSelector } from "react-redux";

export default function CardsContainer() {
  const cards = useSelector((state) => state.renderCards);

  return (
    <div className={s.cards_container}>
      {cards.map((e, i) => (
        <Card {...e} key={i} />
      ))}
    </div>
  );
}
