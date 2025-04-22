import s from "./Form.module.scss";
import { postCard } from "../../requests";
import { useSelector, useDispatch } from "react-redux";
import { setCards, setData, logout } from "../../redux/data";

export default function Form() {
  const user = useSelector((state) => state.user);
  const data = useSelector((state) => state.data);
  const cards = useSelector((state) => state.renderCards);
  const collection = useSelector((state) => state.collection);
  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();
    const newCard = {
      id: Date.now(),
      de: e.target.de.value,
      eng: e.target.eng.value,
      lang: "eng",
      collection: collection,
    };
    if (user) {
      addCardToDB(newCard);
      dispatch(setCards([...cards, newCard]));
      dispatch(setData([...data, newCard]));
    } else {
      dispatch(setCards([...cards, newCard]));
      dispatch(setData([...data, newCard]));
    }
    e.target.eng.value = "";
    e.target.de.value = "";
  };

  const addCardToDB = (newCard) => {
    newCard.user = user;
    postCard(newCard).then((res) => {
      if (res.status !== 200) dispatch(logout());
    });
  };

  return (
    <form className={s.form} onSubmit={(e) => submit(e)}>
      <input type="text" placeholder="eng" name="eng" />
      <input type="text" placeholder="de" name="de" />
      <button>Add</button>
    </form>
  );
}
