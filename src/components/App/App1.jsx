import CardsContainer from "../CardsContainer/CardsContainer";
import { words } from "../data/words";
import { useState } from "react";
import { LanguageContext, UserContext } from "../context/Context";

const App = () => {
  const [render, setRender] = useState("eng");
  const [user, setUser] = useState("Kolja");
  const [state, setState] = useState(0);

  const words2 = localStorage.getItem("words")
    ? JSON.parse(localStorage.getItem("words"))
    : words;

  const submit = (e) => {
    e.preventDefault();
    console.log(words2);
    words2.push({
      id: Date.now(),
      rus: e.target.ru.value,
      eng: e.target.eng.value,
    });
    localStorage.setItem("words", JSON.stringify(words2));
    setState((prev) => prev + 1);
  };

  return (
    <div>
      <form onSubmit={(e) => submit(e)}>
        <input type="text" placeholder="eng" name="eng" />
        <input type="text" placeholder="rus" name="ru" />
        <button>Submit</button>
      </form>
      <LanguageContext.Provider value={render}>
        <UserContext.Provider value={user}>
          <CardsContainer words={words2} />
        </UserContext.Provider>
      </LanguageContext.Provider>
      <div>
        <button onClick={() => setRender("rus")}>rus</button>
        <button onClick={() => setRender("eng")}>eng</button>
      </div>
      <div>
        <button onClick={() => setUser("Kolja")}>Kolja</button>
        <button onClick={() => setUser("Vasja")}>Vasja</button>
      </div>
    </div>
  );
};

export default App;
