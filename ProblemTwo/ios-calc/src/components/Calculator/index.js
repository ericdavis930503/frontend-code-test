import React from "react";
import ButtonPanel from "../ButtonPanel";
import Display from "../Display";
import "./style.css";

export default function Calculator() {
  return (
    <div className="box">
      <div className="wrapper">
        <Display />
        <ButtonPanel />
      </div>
    </div>
  );
}
