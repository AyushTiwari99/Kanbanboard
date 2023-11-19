import React, { useContext, useEffect, useState } from "react";
import "./Board.css";
import Plus from "../../Assets/Icons/Plus.svg";
import threedots from "../../Assets/Icons/threedots.svg";
import filter from "../../Assets/Icons/filter.svg";
import down from "../../Assets/Icons/down.svg"
import Column from "../Column/Column";
import { UserContext } from "../../Context/UserContext.jsx";
import Loader from "../Loader/Loader";

const priorityLevels = ["No priority", "Low", "Medium", "High", "Urgent"];

const sortTickets = (tickets, orderBy) => {
  return orderBy === "priority"
    ? tickets?.sort((a, b) => b.priority - a.priority)
    : orderBy === "title"
      ? tickets?.sort((a, b) => a.title.localeCompare(b.title))
      : tickets;
};

const sortColumnsArray = (columnsArray, orderBy) => {
  return columnsArray?.map((column) => sortTickets(column, orderBy));
};

const sortColumnsObject = (columnsObject, orderBy) => {
  return Object.entries(columnsObject).reduce((result, [key, cards]) => {
    result[key] = sortTickets(cards, orderBy);
    return result;
  }, {});
};


const Board = () => {

  const { data, setData } = useContext(UserContext);
  const [showDisplayBox, setShowDisplayBox] = useState(() => {
    const storedValue = localStorage.getItem("showDisplayBox");
    return storedValue ? JSON.parse(storedValue) : false;
  });

  const [groupBy, setGroupBy] = useState(() => {
    const storedValue = localStorage.getItem("groupBy");
    return storedValue ? JSON.parse(storedValue) : "status";
  });

  const [orderBy, setOrderBy] = useState(() => {
    const storedValue = localStorage.getItem("orderBy");
    return storedValue ? JSON.parse(storedValue) : "priority";
  });

  const [dataReady, setDataReady] = useState(false);
  useEffect(() => {
    if (data) {
      setDataReady(true);
    }
  }, [data]);

  useEffect(() => {
    localStorage.setItem("showDisplayBox", JSON.stringify(showDisplayBox));
    localStorage.setItem("groupBy", JSON.stringify(groupBy));
    localStorage.setItem("orderBy", JSON.stringify(orderBy));
  }, [showDisplayBox, groupBy, orderBy]);

  const filterByStatus = (status) => data?.tickets.filter((ticket) => ticket.status === status);
  const filterByUser = (userId) => data?.tickets.filter((ticket) => ticket.userId === userId);

  const columnsArrayAccToStatus = ["Todo", "In progress", "Backlog"].map((status) =>
    sortTickets(filterByStatus(status), orderBy)
  );

  const columnsArrayAccToUser = data?.users.reduce((result, user) => {
    result[user.name] = sortTickets(filterByUser(user.id), orderBy);
    return result;
  }, {});

  const columnsArrayAccToPriority = priorityLevels.map((priority, index) =>
    sortTickets(data?.tickets.filter((ticket) => ticket.priority.toString() == index), orderBy)
  );

  const handleDisplayClick = () => {
    setShowDisplayBox(!showDisplayBox);
  };

  const handleGroupByChange = (e) => {
    setGroupBy(e.target.value);
  };

  const handleOrderByChange = (e) => {
    setOrderBy(e.target.value);
  };

  const renderColumn = (column, index, heading) => (
    <Column key={index} heading={heading} plusIcon={Plus} dotsIcon={threedots} cards={column} />
  );

  return (
    <>
      {!dataReady && <div><Loader></Loader></div>}
      {dataReady && <div>
        <div className="headerpart">
          <button className="displayButton" onClick={handleDisplayClick}>
            <img src={filter} alt="" />
            Display
            <img src={down} alt="" />
          </button>
          {showDisplayBox && (
            <div className="displayBox">
              <div>
                <label className="label1">Grouping: </label>
                <select value={groupBy} onChange={handleGroupByChange}>
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
              <div>
                <label className="label1">Ordering: </label>
                <select value={orderBy} onChange={handleOrderByChange}>
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          )}
        </div>
        <div className="columns">
          {groupBy === "status" && columnsArrayAccToStatus?.map((column, index) => renderColumn(column, index, column[0]?.status))}
          {groupBy === "user" && Object.entries(columnsArrayAccToUser)?.map(([column, tickets], index) => renderColumn(tickets, index, column))}
          {groupBy === "priority" && columnsArrayAccToPriority?.map((column, index) => renderColumn(column, index, priorityLevels[index]))}
        </div> </div>}
    </>
  );
};

export default Board;
