import s from "./Form.module.scss";
import { postCard, getData } from "../ajax/ajax";
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
      rus: e.target.de.value,
      eng: e.target.eng.value,
      lang: "eng",
      collection: collection,
    };
    if (user) {
      addCardToDB(newCard);
    } else {
      dispatch(setCards([...cards, newCard]));
      dispatch(setData([...data, newCard]));
    }
  };

  const addCardToDB = (newCard) => {
    postCard(newCard).then((res) => {
      if (res.status !== 200) dispatch(logout());
      else {
        getData(user).then((data) => {
          const cards = data.filter((e) => e.collection === collection);
          dispatch(setData(data));
          dispatch(setCards(cards));
        });
      }
    });
  };

  return (
    <form className={s.form} onSubmit={(e) => submit(e)}>
      <input type="text" placeholder=" eng" name="eng" />
      <input type="text" placeholder=" de" name="de" />
      <button>ADD</button>
    </form>
  );
}
