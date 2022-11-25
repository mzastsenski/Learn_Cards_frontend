import CardsContainer from "../CardsContainer/CardsContainer";
import Triggers from "../Triggers/Triggers";
import Form from "../Form/Form";
import { words } from "../data/words";
import { useState, useEffect } from "react";

const App = () => {
  const [cards, setCards] = useState(words);

  useEffect(() => {
    const res = JSON.parse(localStorage.getItem("cards"));
    setCards(res);
  }, []);

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  const addCard = (rus_value, eng_value) => {
    setCards([
      ...cards,
      {
        id: cards.length + 1,
        eng: eng_value,
        rus: rus_value,
        lang: "eng",
      },
    ]);
  };

  // const submit = (e) => {
  //   e.preventDefault();
  //   cards.push({
  //     id: cards.length + 1,
  //     rus: e.target.ru.value,
  //     eng: e.target.eng.value,
  //     lang: "eng",
  //   });
  //   console.log(cards);
  //   setCards([...cards]);
  // };

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

  return (
    <div>
      <Form
        // submit={submit}
        addCard={addCard}
      />
      <CardsContainer words={cards} change_lang={change_lang} />
      <Triggers
        change_to_eng={change_to_eng}
        change_to_rus={change_to_rus}
        change_lang={change_lang}
      />
    </div>
  );
};

export default App;
