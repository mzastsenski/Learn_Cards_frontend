import s from "./Collections.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCollection, setCards } from "../../redux/data";

export default function CardsList() {
  const data = useSelector((state) => state.data);
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
  };

  const changeCollection = (collection) => {
    const newCards = [];
    data.forEach((el) => {
      if (el.collection === collection) newCards.push(el);
    });
    dispatch(setCards(newCards));
    dispatch(setCollection(collection));
  };

  return (
    <div>
      <div className={s.cards_list}>
        {collections.sort().map((e, i) => (
          <button key={i} onClick={() => changeCollection(e)}>
            {e}
          </button>
        ))}
      </div>
      <form className={s.form} onSubmit={(e) => addToSet(e)}>
        <input type="text" placeholder=" New Collection " name="name" />
        <button>Add Collection</button>
      </form>
    </div>
  );
}
