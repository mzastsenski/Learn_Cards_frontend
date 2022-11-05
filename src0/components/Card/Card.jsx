import s from "./Card.module.css";
import { useState } from "react";

export default function Card({ id, rus, eng, lang, change_lang }) {
  const [state, setState] = useState(lang);

  const click = () => {
    if (state === "rus") setState("eng");
    else setState("rus");
  };

  const renderWord = lang === "eng" ? eng : rus;
  const style = {
    backgroundColor: lang === "eng" ? "rgb(41, 128, 185)" : "white",
    color: lang === "rus" ? "rgb(41, 128, 185)" : "white",
  };
  return (
    <div className={s.card} style={style} onClick={() => change_lang(id)}>
      {renderWord}
    </div>
  );
}
