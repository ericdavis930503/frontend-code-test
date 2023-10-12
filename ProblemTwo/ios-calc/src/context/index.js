import React, { createContext, useCallback, useContext, useState } from "react";
import isNumber from "../utils/isNumber";
import operate from "../utils/operate";
import Big from "big.js";

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

  const putSign = useCallback(() => {
    if (next) {
      setNext((-1 * parseFloat(next)).toString());
    } else if (total) {
      setTotal((-1 * parseFloat(total)).toString());
    }
  }, [next, total]);

  const putPercentage = useCallback(() => {
    if (operation && next) {
      const result = operate(total, next, operation);
      setTotal(Big(result).div(Big("100")).toString());
      setNext(null);
      setOperation(null);
    } else if (next) {
      setNext(Big(next).div(Big("100")).toString());
    }
  }, [next, total, operation]);

  const clear = useCallback(() => {
    setTotal(null);
    setNext(null);
    setOperation(null);
  }, []);

  const calc = useCallback(() => {
    if (next && operation) {
      setTotal(operate(total, next, operation));
      setNext(null);
      setOperation(null);
    } else {
      // '=' with no operation, nothing to do
    }
  }, [total, next, operation]);

  const value = {
    next,
    total,
    putNumber,
    putOperator,
    putSign,
    putPercentage,
    clear,
    calc,
  };

  return <CalcContext.Provider value={value}>{children}</CalcContext.Provider>;
};

export const useCalcContext = () => {
  return useContext(CalcContext);
};
