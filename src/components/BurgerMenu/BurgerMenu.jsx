import { useSelector, useDispatch } from "react-redux";
import { setOpened } from "../../redux/data";
import "./BurgerMenu.scss";

export default function BurgerMenu() {
  const isOpened = useSelector((state) => state.menuOpened);
  const dispatch = useDispatch();
  return (
    <div
      className={isOpened ? "burger-menu menu-opened" : "burger-menu"}
      onClick={() => dispatch(setOpened(!isOpened))}
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
