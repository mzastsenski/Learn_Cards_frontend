import CardsContainer from "../CardsContainer/CardsContainer";
import Triggers from "../Triggers/Triggers";
import Form from "../Form/Form";
import { words } from "../data/words";
import { useState, useEffect } from "react";

const App = () => {
  const [cards, setCards] = useState([]);
  let url = "http://localhost:4000";
  url = "https://learncards.mzas.de";



  
  useEffect(() => {
    get();
  }, []);

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

  const postData = (data) => {
    fetch(`${url}/api/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    });
    // .then((res) => res.json())
    // .then((res) => console.log(res))
    // .catch((err) => console.log(err));
  };

  const get = () => {
    fetch(`${url}/api/cards`).then((res) =>
      res.json().then((res) => setCards(res))
    );
  };

  const clear = () => {
    setCards(words);
    postData(words);
  };
  const clear2 = () => {
    setCards([
      { id: 1, rus: "hund", eng: "dog", lang: "eng" },
      { id: 2, rus: "kater", eng: "cat", lang: "eng" },
    ]);
    postData([
      { id: 1, rus: "hund", eng: "dog", lang: "eng" },
      { id: 2, rus: "kater", eng: "cat", lang: "eng" },
    ]);
  };

  // const change_lang = (id) => {
  //   cards[id - 1].lang = cards[id - 1].lang === "eng" ? "rus" : "eng";
  //   setCards([...cards]);
  // };

  const change_lang = (id) => {
    const newCards = cards.map((el) => {
      if (el.id === id) {
        el.lang = el.lang === "eng" ? "rus" : "eng";
        // if (el.lang === "eng") el.lang = "rus";
        // else el.lang = "eng";
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
        clear2={clear2}
      />
    </div>
  );
};

export default App;
