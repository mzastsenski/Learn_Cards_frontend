import Card from "../Card/Card";
import s from "./CardsContainer.module.scss";
import { useSelector } from "react-redux";

export default function CardsContainer() {
  const cards = useSelector((state) => state.renderCards);
  const sortCards = [...cards].sort((a, b) => a.id - b.id);

  return (
    <div className={s.cards_container}>
      {sortCards.map((e, i) => (
        <Card {...e} key={i} />
      ))}
    </div>
  );
}
