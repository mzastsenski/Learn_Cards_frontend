import s from "./Card.module.css";
import { useState } from "react";

export default function Card({ id, rus, eng, lang, change_lang, deleteCard }) {
  const [state, setState] = useState(lang);

  const click = (e) => {
    e.stopPropagation();
    deleteCard(id);
  };

  const renderWord = lang === "eng" ? eng : rus;
  const style = {
    backgroundColor: lang === "eng" ? "rgb(41, 128, 185)" : "white",
    color: lang === "rus" ? "rgb(41, 128, 185)" : "white",
  };
  return (
    <div className={s.card} style={style} onClick={() => change_lang(id)}>
      <button className={s.button} onClick={(e) => click(e)}>X</button>
      {renderWord}
    </div>
  );
}
