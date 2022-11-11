import React from "react";
import s from "./Form.module.css";

export default function Form({ submit, addCard }) {
  const submitForm = (e) => {
    e.preventDefault();
    const { ru, eng } = e.target;
    addCard(ru.value, eng.value);
  };

  return (
    <form className={s.form} onSubmit={(e) => submitForm(e)}>
      <input type="text" placeholder="eng" name="eng" />
      <input type="text" placeholder="rus" name="ru" />
      <button>Submit</button>
    </form>
  );
}
