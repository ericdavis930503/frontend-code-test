import { useCalcContext } from "../../context";
import "./style.css";

const Button = ({ type, value, ...props }) => {
  const { putNumber } = useCalcContext();
  return {
    number: (
      <button
        className="grey"
        value={value}
        onClick={() => putNumber(value)}
        {...props}
      >
        {value}
      </button>
    ),
    operator: (
      <button className="orange" {...props}>
        {value}
      </button>
    ),
    calc: (
      <button className="orange" {...props}>
        =
      </button>
    ),
    sign: (
      <button className="grey" {...props}>
        +/-
      </button>
    ),
    percentage: (
      <button className="grey" {...props}>
        %
      </button>
    ),
    clean: (
      <button className="grey" {...props}>
        AC
      </button>
    ),
  }[type];
};

export default Button;
