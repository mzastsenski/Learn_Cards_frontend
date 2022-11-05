import React from "react";
import s from "./Triggers.module.css";

export default function Triggers({
  change_to_eng,
  change_to_rus,
  clear,
  clear2,
}) {
  return (
    <div className={s.triggers}>
      <button onClick={change_to_rus}>Rus</button>
      <button onClick={change_to_eng}>Eng</button>
      <button className={s.red} onClick={() => clear()}>
        Reset
      </button>
    </div>
  );
}
