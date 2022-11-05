import React from "react";
import s from "./Triggers.module.css";

export default function Triggers({ change_to_eng, change_to_rus }) {
  return (
    <div className={s.triggers}>
      <button onClick={change_to_rus}>Rus</button>
      <button onClick={change_to_eng}>Eng</button>
    </div>
  );
}
