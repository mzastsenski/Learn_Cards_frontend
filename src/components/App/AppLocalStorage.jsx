import CardsContainer from "../CardsContainer/CardsContainer";
import Triggers from "../Triggers/Triggers";
import Form from "../Form/Form";
import { words } from "../data/words";
import { useState, useEffect } from "react";


const App = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    get();
  }, []);

  const postData = (data) => {
    localStorage.setItem("cards", JSON.stringify(data));
  };

  const submit = (e) => {
    e.preventDefault();
    cards.push({
      id: cards.length + 1,
      rus: e.target.ru.value,
      eng: e.target.eng.value,
      lang: "eng",
    });
    setCards([...cards]);
    postData(cards);
  };

  const get = () => {
    const newCards = localStorage.getItem("cards")
      ? JSON.parse(localStorage.getItem("cards"))
      : words;
    setCards(newCards);
  };

  const clear = () => {
    setCards(words);
    postData(words);
  };

  const change_lang = (id) => {
    const newCards = cards.map((el) => {
      if (el.id === id) {
        el.lang = el.lang === "eng" ? "rus" : "eng";
      }
      return el;
    });
    setCards(newCards);
  };

  const change_to_eng = () => {
    const newCards = cards.map((el) => {
      el.lang = "eng";
      return el;
    });
    setCards(newCards);
  };

  const change_to_rus = () => {
    const newCards = cards.map((el) => {
      el.lang = "rus";
      return el;
    });
    setCards(newCards);
  };

  const deleteCard = (id) => {
    const newCards = cards.filter((e) => e.id !== id);
    setCards(newCards);
    postData(newCards);
  };

  return (
    <div>
      <Form submit={submit} />
      <CardsContainer
        words={cards}
        change_lang={change_lang}
        deleteCard={deleteCard}
      />
      <Triggers
        change_to_eng={change_to_eng}
        change_to_rus={change_to_rus}
        change_lang={change_lang}
        clear={clear}
      />
    </div>
  );
};

export default App;
