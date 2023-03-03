import s from "./Card.module.scss";
import { useState, useEffect } from "react";
import { deleteOneCard } from "../../requests";
import { useSelector, useDispatch } from "react-redux";
import { setData, setCards, logout } from "../../redux/data";

export default function Card({ id, rus, eng, lang }) {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.renderCards);
  const data = useSelector((state) => state.data);
  const user = useSelector((state) => state.user);
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setFlipped(false);
  }, []);

  useEffect(() => {
    setFlipped((prev) => !prev);
  }, [lang]);

  const flip = () => {
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
    if (user)
      deleteOneCard({ id: id }).then((res) =>
        res.status !== 200 ? dispatch(logout()) : null
      );
  };

  return (
    <div
      className={flipped ? `${s.card} ${s.flipped}` : `${s.card}`}
      onClick={() => flip()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={s.card_inner}>
        <div className={s.card_front}>
          {rus}
          {hovered && (
            <button className={s.button} onClick={deleteCard}>
              X
            </button>
          )}
        </div>
        <div className={s.card_back}>
          {eng}
          {hovered && (
            <button className={s.button} onClick={deleteCard}>
              X
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
