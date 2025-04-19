import s from "./Triggers.module.scss";
import { words } from "../../data/defaultCards";
import { postCard, deleteOneCard } from "../../requests";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setData, setCards, setCollection } from "../../redux/data";

export default function Triggers() {
  const [flipped, setFlipped] = useState(false);
  const user = useSelector((state) => state.user);
  const data = useSelector((state) => state.data);
  const cards = useSelector((state) => state.renderCards);
  const dispatch = useDispatch();

  const clear = () => {
    if (user) {
      data.forEach((e) => {
        if (e.collection === "Collection") deleteOneCard({ id: e.id });
      });
      const newData = [...data];
      words.forEach((e) => {
        newData.push(e);
        postCard(e);
      });
      dispatch(setCollection("Collection"));
      dispatch(setData(newData));
      dispatch(setCards(words));
    } else {
      dispatch(setCards(words));
    }
  };

  const change_to_eng = () => {
    const newCards = cards.map((el) => ({
      ...el,
      lang: "eng",
    }));
    dispatch(setCards(newCards));
  };

  const change_to_de = () => {
    const newCards = cards.map((el) => ({
      ...el,
      lang: "de",
    }));
    dispatch(setCards(newCards));
  };

  const flip = () => {
    !flipped ? change_to_de() : change_to_eng();
    setFlipped(!flipped);
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
