import Card from "../Card/Card";
import s from "./CardsContainer.module.css";

export default function CardsContainer({ words, change_lang }) {
  return (
    <div className={s.cards_container}>
      {words.map((e) => (
        <Card {...e} key={e.id} change_lang={change_lang} />
      ))}
    </div>
  );
}
