import s from "./Card.module.css";
import { deleteOneCard } from "../../Ajax";
import { useSelector, useDispatch } from "react-redux";
import { setData, setCards } from "../../redux/data";

export default function Card({ id, rus, eng, lang }) {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.renderCards);
  const data = useSelector((state) => state.data);
  const user = useSelector((state) => state.user);

  const change_lang = (id) => {
    const newCards = cards.map((el) => {
      if (el.id === id) {
        return {
          ...el,
          lang: el.lang === "eng" ? "rus" : "eng",
        };
      }
      return el;
    });
    dispatch(setCards(newCards));
  };

  const deleteCard = (event) => {
    event.stopPropagation();
    const newCards = cards.filter((e) => e.id !== id);
    const newData = data.filter((e) => e.id !== id);
    dispatch(setCards(newCards));
    dispatch(setData(newData));
    if (user) deleteOneCard({ id: id });
  };

  const renderWord = lang === "eng" ? eng : rus;
  const style = {
    backgroundColor: lang === "eng" ? "rgb(41, 128, 185)" : "white",
    color: lang === "rus" ? "rgb(41, 128, 185)" : "white",
  };
  return (
    <div className={s.card} style={style} onClick={() => change_lang(id)}>
      <button className={s.button} onClick={(e) => deleteCard(e)}>
        X
      </button>
      {renderWord}
    </div>
  );
}
