import Card from "../Card/Card";
import s from "./CardsContainer.module.scss";
import { useSelector } from "react-redux";

export default function CardsContainer() {
  const cards = useSelector((state) => state.renderedCards);
  const sortCards = [...cards].sort((a, b) => a.id - b.id);

  return (
    <div className={s.cards_container}>
      {sortCards.map((e) => (
        <Card {...e} key={e.id} />
      ))}
    </div>
  );
}
