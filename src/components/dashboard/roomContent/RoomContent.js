import React from "react";
import Content from "../Content";

import { useState } from "react";
import addIcon from "../../../static/images/add-room.png";

const RoomContent = ({ onData }) => {
  const urls = `https://localhost:7124/api/rooms/`;

  const [buildingHeaders] = useState([
    { Header: "Id", accessor: "id" },
    { Header: "Building Id", accessor: "buildingId" },
    { Header: "Room name", accessor: "roomNumber" },
    { Header: "Status", accessor: "status" },
  ]);

  return (
    <Content
      headers={buildingHeaders}
      onData={onData}
      url={urls}
      title={"Rooms"}
      addIcon={addIcon}
    />
  );
};

export default RoomContent;
