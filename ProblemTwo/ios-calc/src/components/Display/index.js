import React from "react";
import { useCalcContext } from "../../context";
import "./style.css";

const getFontSize = (str) => {
  if (str.length >= 22) return "xxs";
  if (str.length >= 18) return "xs";
  if (str.length >= 15) return "small";
  if (str.length > 10) return "medium";
  return "large";
};

export default function Display() {
  const { next, total } = useCalcContext();

  const result = next || total || 0;
  const fntSize = getFontSize(result.toString());

  return (
    <div className="result-container">
      <h1 className={`result ${fntSize}`}>{result}</h1>
    </div>
  );
}
