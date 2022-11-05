import s from "./Card.module.css";
import { useState, useEffect, useContext } from "react";
import { LanguageContext, UserContext } from "../context/Context";

export default function Card({ rus, eng, lang }) {
  const render = useContext(LanguageContext);
  const user = useContext(UserContext);
  const [state, setState] = useState(render);

  useEffect(() => setState(render), [render]);

  const click = () => {
    if (state === "rus") setState("eng");
    else setState("rus");
  };

  const renderWord = state === "eng" ? eng : rus;
  const style = {
    backgroundColor: state === "eng" ? "rgb(41, 128, 185)" : "white",
    color: state === "rus" ? "rgb(41, 128, 185)" : "white",
  };
  return (
    <div className={s.card} style={style} onClick={click}>
      {renderWord}
    </div>
  );
}
