import React from "react";
import { useCalcContext } from "../../context";
import "./style.css";

export default function Display() {
  const { next } = useCalcContext();
  const result = next || 0;

  return (
    <div className="result-container">
      <h1 className="result">{result}</h1>
    </div>
  );
}
