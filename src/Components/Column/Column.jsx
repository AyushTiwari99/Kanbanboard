import React from "react";
import Card from "../Card/Card";
import "./Column.css";
import network from "../../Assets/Icons/network.svg";

const Column = ({ heading, plusIcon, dotsIcon, cards }) => (
  <div className="column1">
    <div className="columnHeading">
      <div className="columnHeadingLeft"> <img src={network} alt="" /> {heading} <span className="length">{cards.length}</span></div>
      <div className="columnHeadingRight">
        <img src={plusIcon} alt="" />
        <img src={dotsIcon} alt="" />
      </div>
    </div>
    {cards.map((ticket) => (
      <Card key={ticket.id} ticket={ticket} />
    ))}
  </div>
);

export default Column;
