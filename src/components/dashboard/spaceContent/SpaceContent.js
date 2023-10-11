import { useState } from "react";

import addIcon from "../../../static/images/add.png";
import Content from "../Content";
import Overlay from "../../UI/Modal/SpaceOverlay";

const SpaceContent = () => {
  const urls = `https://localhost:7124/api/space/`;

  const [buildingHeaders] = useState([
    { Header: "Id", accessor: "id" },
    { Header: "Room Id", accessor: "roomId" },
    { Header: "Name", accessor: "name" },
  ]);

  return (
    <Content
      headers={buildingHeaders}
      onData={() => {}}
      url={urls}
      title={"Spaces"}
      addIcon={addIcon}
      isMore={true}
      Overlay={Overlay}
    />
  );
};

export default SpaceContent;
