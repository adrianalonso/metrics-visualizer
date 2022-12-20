import { TitleProps } from "./types";
import style from "./style.module.scss";
import Icon from "./chart.svg";

const Title = ({ title, description }: TitleProps) => {
  return (
    <div className={style.box}>
      <div className={style.title}>
        <Icon />
        <h1>{title}</h1>
      </div>
      <p className={style.description}>{description}</p>
    </div>
  );
};

export default Title;
