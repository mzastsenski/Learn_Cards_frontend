import React from "react";
import s from "./Form.module.css";

export default function Form({ submit }) {
  return (
    <div>
      <form className={s.form} onSubmit={(e) => submit(e)}>
        <input type="text" placeholder="eng" name="eng" />
        <input type="text" placeholder="rus" name="ru" />
        <button>ADD</button>
      </form>
    </div>
  );
}
