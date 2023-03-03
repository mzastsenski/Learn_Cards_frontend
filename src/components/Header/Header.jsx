import s from "./Header.module.scss";
import Collections from "../Collections/Collections";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { NavLink } from "react-router-dom";
import { BiUser as UserIcon } from "react-icons/bi";
import { FiPower as LoginIcon } from "react-icons/fi";
import { useSelector } from "react-redux";

export default function Header() {
  const user = useSelector((state) => state.user);

  return (
    <div className={s.header}>
      <BurgerMenu />
      <Collections />
      <span className={s.title}>
        <NavLink to="/" className={s.menuItem1}>
          Learn-Cards
        </NavLink>
      </span>
      {user ? (
        <>
          <NavLink to="/Login" className={s.user_name}>
            &nbsp;{user}&nbsp;
          </NavLink>
          <NavLink to="/Login">
            <UserIcon size={31} />
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/Login" className={s.user_name}>
            &nbsp;Login&nbsp;
          </NavLink>
          <NavLink to="/Login">
            <LoginIcon size={30} />
          </NavLink>
        </>
      )}
    </div>
  );
}
