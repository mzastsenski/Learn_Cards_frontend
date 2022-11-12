import "./Login.scss";
import { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { postData } from "../ajax/ajax";

const Signup = () => {
  const userNameRef = useRef();
  const passwortRef = useRef();
  const passwortConfirmRef = useRef();
  const navigate = useNavigate();

  const signUp = () => {
    const user = userNameRef.current.value;
    const pass = passwortRef.current.value;
    const passConf = passwortConfirmRef.current.value;

    if (user && pass && passConf && pass === passConf) {
      const data = { user: user, pass: pass, met: "signUp" };
      postData(data)
        .then((res) => {
          if (res === "Success") {
            navigate("/Login");
          } else {
            alert("User exist");
          }
        })
        .catch((err) => console.log(err));
    } else {
      alert("enter your data");
    }
  };

  return (
    <div className="Login">
      <div className="Fields">
        <label className="field">
          <span>User Name: </span>
          <input ref={userNameRef} type="text"></input>
        </label>
        <label className="field">
          <span>Passwort: </span>
          <input ref={passwortRef} type="password"></input>
        </label>
        <label className="field">
          <span>Confirm Passwort: </span>
          <input ref={passwortConfirmRef} type="password"></input>
        </label>
      </div>
      <br />
      <div className="login_buttons">
        <button type="button" onClick={signUp}>
          Sign up
        </button>
        <NavLink to="/">
          <button type="button">Cancel</button>
        </NavLink>
      </div>
      <NavLink to="/Login">
        <p type="button">Already registered? Login</p>
      </NavLink>
    </div>
  );
};

export default Signup;
