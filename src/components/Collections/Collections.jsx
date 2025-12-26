import s from "./Collections.module.scss";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCollection, setCards, setOpened } from "../../redux/data";
import { getData, deleteCollection } from "../../requests";

export default function Collections() {
  const data = useSelector((state) => state.data);
  const user = useSelector((state) => state.user);
  const stateCollection = useSelector((state) => state.collection);
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

  const newCollection = (e) => {
    e.preventDefault();
    const newCollection = e.target.name.value;
    setCollections([...collections, newCollection]);
    dispatch(setCollection(newCollection));
    changeCollection(newCollection);
    dispatch(setOpened(!isOpened));
  };

  const changeCollection = (collection) => {
    const newCards = [];
    data.forEach((el) => {
      if (el.collection === collection) newCards.push(el);
    });
    dispatch(setCards(newCards));
    dispatch(setCollection(collection));
    dispatch(setOpened(!isOpened));
    window.scrollTo(0, 0);
  };

  const removeCollection = async (collection) => {
    if (window.confirm("Do you want to remove this collection?")) {
      const data = {
        user,
        collection,
      };
      await deleteCollection(data);
      getData(user, stateCollection, dispatch);
    }
  };

  return (
    <div className={[s.collections, isOpened ? s.show : null].join(" ")}>
      <form className={s.form} onSubmit={(e) => newCollection(e)}>
        <label>
          <input type="text" placeholder="New Collection " name="name" />
        </label>
        <button>Add</button>
      </form>
      <div className={s.collections_list}>
        {collections.sort().map((e, i) => (
          <div key={i}>
            <button onClick={() => changeCollection(e)}>{e}</button>
            <button
              className={s.delete_button}
              onClick={() => removeCollection(e)}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
