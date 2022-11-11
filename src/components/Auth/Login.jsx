import "./Login.scss";
import { useRef } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { postData, postLogout } from "../../Ajax";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/data";

const Login = () => {
  const userNameRef = useRef();
  const passwortRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginFault = () => {
    alert("Login Fault");
    localStorage.setItem("user", "");
  };

  const login = () => {
    const user = userNameRef.current.value;
    const pass = passwortRef.current.value;
    if (user && pass) {
      const data = { user: user, pass: pass, met: "login" };
      postData(data)
        .then((res) => {
          if (res === 200) {
            localStorage.setItem("user", user);
            dispatch(setUser(user));
            navigate("/");
          } else loginFault();
        })
        .catch((err) => loginFault());
    } else {
      alert("Enter your data");
    }
  };

  const logout = () => {
    localStorage.setItem("user", "");
    dispatch(setUser(""));
    postLogout();
    navigate("/");
  };

  const jsx1 = (
    <div className="Login">
      <label className="field">
        <span>User Name: </span>
        <input ref={userNameRef} type="text"></input>
      </label>
      <label className="field">
        <span>Passwort: </span>
        <input
          ref={passwortRef}
          onKeyPress={(e) => e.key === "Enter" && login()}
          type="password"
        ></input>
      </label>
      <br />
      <div className="login_buttons">
        <button type="button" onClick={login}>
          Login
        </button>
        <NavLink to="/">
          <button type="button">Cancel</button>
        </NavLink>
      </div>
      <NavLink to="/Signup">
        <p type="button">New user? Signup</p>
      </NavLink>
    </div>
  );

  const jsx2 = (
    <div className="Login">
      <div className="login-info">
        <>You are logged as {localStorage.getItem("user")}</>
      </div>
      <div className="login_buttons">
        <button type="button" onClick={logout}>
          Logout
        </button>
        <NavLink to="/">
          <button type="button">Cancel</button>
        </NavLink>
      </div>
    </div>
  );

  return <>{!localStorage.getItem("user") ? jsx1 : jsx2}</>;
};

export default Login;
