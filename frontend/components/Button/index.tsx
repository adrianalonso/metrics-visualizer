import ButtonProps from "./types";
import style from "./style.module.scss";
import classNames from "classnames";

const Button = ({ children, selected = false, onClick }: ButtonProps) => {
  return (
    <button
      className={classNames({
        [style.button]: true,
        [style["--enabled"]]: selected,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
