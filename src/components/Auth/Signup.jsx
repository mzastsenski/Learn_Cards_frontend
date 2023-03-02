import "./Modal.scss";
import "./Login.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { postData } from "../../requests";

const Signup = () => {
  const navigate = useNavigate();

  const signUp = (e) => {
    e.preventDefault();
    const user = e.target.user.value;
    const pass = e.target.password.value;
    const passConf = e.target.confirm.value;

    if (user && pass && passConf && pass === passConf) {
      const data = { user: user, pass: pass, met: "signUp" };
      postData(data)
        .then((res) => {
          if (res === 200) {
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
    <div className="modal">
      <div className="modal_content">
        <form className="Login" onSubmit={signUp}>
          <div className="Fields">
            <label className="field">
              <input name="user" type="text" placeholder="Username"></input>
            </label>
            <label className="field">
              <input
                name="password"
                type="password"
                placeholder="Password"
              ></input>
            </label>
            <label className="field">
              <input
                name="confirm"
                type="password"
                placeholder="Confirm password"
              ></input>
            </label>
          </div>
          <br />
          <div className="login_buttons">
            <button type="submit">Sign up</button>
            <NavLink to="/">
              <button type="button">Cancel</button>
            </NavLink>
          </div>
          <NavLink to="/Login">
            <p type="button">Already registered? Login</p>
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default Signup;
