import "./Modal.scss";
import "./Login.scss";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getData, postData } from "../../requests";
import { useDispatch } from "react-redux";
import { setUser, logout } from "../../redux/data";
import { useState, useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [style, setStyle] = useState({
    opacity: 0.3,
  });

  useEffect(() => {
    setStyle({
      opacity: 1,
      transition: "0.6s",
    });
  }, []);

  const loginFault = () => {
    alert("Login Fault");
    localStorage.setItem("user", "");
  };

  const login = (e) => {
    e.preventDefault();
    const user = e.target.user.value;
    const pass = e.target.password.value;
    if (user && pass) {
      const data = { user: user, pass: pass, met: "login" };
      postData(data)
        .then((res) => {
          if (res === 200) {
            localStorage.setItem("user", user);
            dispatch(setUser(user));
            getData(user, "Collection", dispatch);
            navigate("/");
          } else loginFault();
        })
        .catch(() => loginFault());
    } else {
      alert("Enter your data");
    }
  };

  const user_logout = () => {
    dispatch(logout());
    navigate("/");
  };

  const jsx1 = (
    <form className="Login" onSubmit={login}>
      <label className="field">
        <input name="user" type="text" placeholder="Username"></input>
      </label>
      <label className="field">
        <input
          name="password"
          onKeyPress={(e) => e.key === "Enter" && login()}
          type="password"
          placeholder="Password"
        ></input>
      </label>
      <br />
      <div className="login_buttons">
        <button type="submit">Login</button>
        <NavLink to="/">
          <button type="button">Cancel</button>
        </NavLink>
      </div>
      <NavLink to="/Signup">
        <p type="button">New user? Sign up</p>
      </NavLink>
    </form>
  );

  const jsx2 = (
    <div className="Login">
      <div className="login-info">
        <>You are logged as {localStorage.getItem("user")}</>
      </div>
      <div className="login_buttons">
        <button type="button" onClick={user_logout}>
          Logout
        </button>
        <NavLink to="/">
          <button type="button">Cancel</button>
        </NavLink>
      </div>
    </div>
  );

  return (
    <div style={style} className="modal">
      <div className="modal_content">
        {!localStorage.getItem("user") ? jsx1 : jsx2}
      </div>
    </div>
  );
};

export default Login;
