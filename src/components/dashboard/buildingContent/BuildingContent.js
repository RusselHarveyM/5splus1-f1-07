import Content from "../Content";
import { useState } from "react";
import addIcon from "../../../static/images/add-building-2.png";

const BuildingContent = ({ onData }) => {
  const urls = `https://localhost:7124/api/buildings`;

  const [buildingHeaders] = useState([
    { Header: "Id", accessor: "id" },
    { Header: "Name", accessor: "buildingName" },
    { Header: "Code", accessor: "buildingCode" },
  ]);

  return (
    <Content
      headers={buildingHeaders}
      onData={onData}
      url={urls}
      title={"Buildings"}
      addIcon={addIcon}
    />
  );
};

export default BuildingContent;
