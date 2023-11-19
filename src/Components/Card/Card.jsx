import React from "react";
import title from "../../Assets/Icons/title.svg"
import tag from "../../Assets/Icons/Tag.svg"
import "./Card.css";

const Card = ({ ticket }) => (
    <div className="card1">
        <div className="id">{ticket.id}</div>
        <div className="title">
            <img src={title} alt="" />
            {ticket.title}
        </div>
        <div className="tagContainer">
        <span className="tag">
            <img src={tag} alt="" />
            {ticket.tag.join(", ")}</span>
        </div>
        
    </div>
);

export default Card;
