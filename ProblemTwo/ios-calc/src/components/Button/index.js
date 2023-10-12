import { useCalcContext } from "../../context";
import "./style.css";

const Button = ({ type, value, ...props }) => {
  const { putNumber, putOperator, putPercentage, putSign, calc, clear } =
    useCalcContext();

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
      <button className="orange" onClick={() => putOperator(value)} {...props}>
        {value}
      </button>
    ),
    calc: (
      <button className="orange" onClick={() => calc()} {...props}>
        =
      </button>
    ),
    sign: (
      <button className="grey" onClick={() => putSign()} {...props}>
        +/-
      </button>
    ),
    percentage: (
      <button className="grey" onClick={() => putPercentage()} {...props}>
        %
      </button>
    ),
    clean: (
      <button className="grey" onClick={() => clear()} {...props}>
        AC
      </button>
    ),
  }[type];
};

export default Button;
