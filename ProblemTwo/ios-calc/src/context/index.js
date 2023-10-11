import React, { createContext, useCallback, useContext, useState } from "react";
import isNumber from "../utils/isNumber";

const CalcContext = createContext(undefined);

export const CalcProvider = ({ children }) => {
  const [next, setNext] = useState(null);

  const putNumber = useCallback(
    (value) => {
      if (isNumber(value)) {
        if (value === "0" && next === "0") {
          // nothing to do
        } else if (next) {
          setNext(next === "0" ? value : next + value);
        } else {
          setNext(value);
        }
      } else if (value === ".") {
        if (next) {
          // ignore a . if the next number already has one
          if (next.includes(".")) {
          } else {
            setNext(next + ".");
          }
        } else {
          setNext("0.");
        }
      }
    },
    [next],
  );

  const value = {
    next,
    putNumber,
  };

  return <CalcContext.Provider value={value}>{children}</CalcContext.Provider>;
};

export const useCalcContext = () => {
  return useContext(CalcContext);
};
