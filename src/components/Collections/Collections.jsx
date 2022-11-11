import s from "./Collections.module.scss";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCollection, setCards, setOpened } from "../../redux/data";

export default function CardsList() {
  const data = useSelector((state) => state.data);
  const isOpened = useSelector((state) => state.menuOpened);
  const [collections, setCollections] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const arr = [];
    data.forEach((e) => {
      if (!arr.includes(e.collection)) arr.push(e.collection);
    });
    setCollections(arr);
  }, [data]);

  const addToSet = (e) => {
    e.preventDefault();
    const newCollection = e.target.name.value;
    setCollections([...collections, newCollection]);
    dispatch(setCollection(newCollection));
    changeCollection(newCollection);
    dispatch(setOpened(isOpened));
  };

  const changeCollection = (collection) => {
    const newCards = [];
    data.forEach((el) => {
      if (el.collection === collection) newCards.push(el);
    });
    dispatch(setCards(newCards));
    dispatch(setCollection(collection));
    dispatch(setOpened(!isOpened));
  };

  return (
    <div className={[s.collections, isOpened ? s.show : null].join(" ")}>
      <form className={s.form} onSubmit={(e) => addToSet(e)}>
        <label>
          <input type="text" placeholder="New Collection " name="name" />
        </label>
        <button>Add</button>
      </form>
      <div className={s.collections_list}>
        {collections.sort().map((e, i) => (
          <button key={i} onClick={() => changeCollection(e)}>
            {e}
          </button>
        ))}
      </div>
    </div>
  );
}
