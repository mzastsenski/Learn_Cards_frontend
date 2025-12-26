import s from "./Triggers.module.scss";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCards, setDefault } from "../../redux/data";

export default function Triggers() {
  const [flipped, setFlipped] = useState(false);
  const user = useSelector((state) => state.user);
  const cards = useSelector((state) => state.renderedCards);
  const dispatch = useDispatch();

  const flip = () => {
    const newCards = cards.map((e) => ({
      ...e,
      lang: flipped ? "eng" : "de",
    }));
    setFlipped(!flipped);
    dispatch(setCards(newCards));
  };

  const clear = () => {
    dispatch(setDefault());
  };

  return (
    <div className={s.triggers}>
      <button onClick={flip}>Flip All</button>
      {!user && (
        <button className={s.red} onClick={() => clear()}>
          Reset
        </button>
      )}
    </div>
  );
}
