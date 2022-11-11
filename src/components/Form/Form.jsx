import s from "./Form.module.css";
import { postCard } from "../../Ajax";
import { useSelector, useDispatch } from "react-redux";
import { setCards, setData } from "../../redux/data";

export default function Form() {
  const user = useSelector((state) => state.user);
  const data = useSelector((state) => state.data);
  const cards = useSelector((state) => state.renderCards);
  const collection = useSelector((state) => state.collection);
  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();
    const newCard = {
      rus: e.target.ru.value,
      eng: e.target.eng.value,
      lang: "eng",
      collection: collection 
    };
    dispatch(setCards([...cards, newCard]));
    dispatch(setData([...data, newCard]));
    if (user) postCard(newCard);
  };

  return (
    <form className={s.form} onSubmit={(e) => submit(e)}>
      <input type="text" placeholder=" eng" name="eng" />
      <input type="text" placeholder=" rus" name="ru" />
      <button>ADD</button>
    </form>
  );
}
