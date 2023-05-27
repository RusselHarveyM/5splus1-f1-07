import classes from "./Manage.module.css";
import { useState } from "react";

const Manage = () => {
  const [usersContent, toggleUsersContent] = useState(true);
  const [buildingContent, toggleBuildingContent] = useState(false);
  const [roomContent, toggleRoomContent] = useState(false);

  const toggleUsers = () => {
    toggleUsersContent(true);
    toggleBuildingContent(false);
    toggleRoomContent(false);
  };
  const toggleBuilding = () => {
    toggleBuildingContent(true);
    toggleRoomContent(false);
    toggleUsersContent(false);
  };
  const toggleRoom = () => {
    toggleRoomContent(true);
    toggleBuildingContent(false);
    toggleUsersContent(false);
  };

  return (
    <nav>
      <ul className={classes.manageNav}>
        <li>
          <button
            onClick={toggleUsers}
            className={`${usersContent ? classes.active : ""}`}
          >
            Users
          </button>
        </li>
        <li>
          <button
            onClick={toggleBuilding}
            className={`${buildingContent ? classes.active : ""}`}
          >
            Building
          </button>
        </li>
        <li>
          <button
            onClick={toggleRoom}
            className={`${roomContent ? classes.active : ""}`}
          >
            Room
          </button>
        </li>
      </ul>
    </nav>
  );
};
export default Manage;
