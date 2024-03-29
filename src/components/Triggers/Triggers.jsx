import s from "./Triggers.module.scss";
import { words } from "../../data/defaultCards";
import { postCard, deleteOneCard } from "../../requests";
import { useSelector, useDispatch } from "react-redux";
import { setData, setCards, setCollection } from "../../redux/data";

export default function Triggers() {
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

  return (
    <div className={s.triggers}>
      <button onClick={change_to_eng}>Eng</button>
      <button onClick={change_to_de}>De</button>
      {!user && (
        <button className={s.red} onClick={() => clear()}>
          Reset
        </button>
      )}
    </div>
  );
}
