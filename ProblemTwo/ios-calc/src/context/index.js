import React, { createContext, useCallback, useContext, useState } from "react";
import isNumber from "../utils/isNumber";
import operate from "../utils/operate";

const CalcContext = createContext(undefined);

export const CalcProvider = ({ children }) => {
  const [total, setTotal] = useState(null);
  const [next, setNext] = useState(null);
  const [operation, setOperation] = useState(null);

  const putNumber = useCallback(
    (value) => {
      if (isNumber(value)) {
        if (value === "0" && next === "0") {
          // nothing to do
        } else if (operation) {
          if (next) {
            setNext(next + value);
          } else {
            setNext(value);
          }
        } else if (next) {
          setNext(next === "0" ? value : next + value);
          setTotal(null);
        } else {
          setNext(value);
          setTotal(null);
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
    [next, operation],
  );

  const putOperator = useCallback(
    (op) => {
      if (operation) {
        setTotal(operate(total, next, operation));
        setNext(null);
        setOperation(op);
      } else if (!next) {
        setOperation(op);
      } else {
        setTotal(next);
        setNext(null);
        setOperation(op);
      }
    },
    [total, next, operation],
  );

  const value = {
    next,
    total,
    putNumber,
    putOperator,
  };

  return <CalcContext.Provider value={value}>{children}</CalcContext.Provider>;
};

export const useCalcContext = () => {
  return useContext(CalcContext);
};
