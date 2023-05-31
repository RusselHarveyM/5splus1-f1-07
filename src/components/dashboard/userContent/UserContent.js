import Mock_data from "../../MOCK_DATA.json";
import Table from "../../UI/table/Table";
import classes from "./UserContent.module.css";
import action from "../../../static/images/link.png";
import deleteIcon from "../../../static/images/delete.png";

import { useState, useCallback } from "react";

const UserContent = () => {
  const [actionBtns, setActionBtns] = useState({});

  // Use useCallback to avoid creating a new function on every render
  const ActionBtnHandler = useCallback((rowId) => {
    setActionBtns((prevState) => {
      // Reset the state of all buttons
      const newState = Object.keys(prevState).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});

      // Toggle the state of the clicked button
      newState[rowId] = !prevState[rowId];

      return newState;
    });
  }, []);

  const m_columns = [
    {
      Header: "Id",
      accessor: "User Id",
      Footer: "Id",
    },
    {
      Header: "Last Name",
      accessor: "Last Name",
      Footer: "Last Name",
    },
    {
      Header: "First Name",
      accessor: "First Name",
      Footer: "First Name",
    },
    {
      Header: "Username",
      accessor: "Username",
      Footer: "Username",
    },
    {
      Header: "Actions",
      Cell: ({ row }) => (
        <>
          {!actionBtns[row.original["User Id"]] ? (
            <button
              onClick={() => ActionBtnHandler(row.original["User Id"])}
              className={classes.actionBtn}
            >
              <img src={action} alt="actionIcon" />
            </button>
          ) : (
            <div>
              <button>
                <img src={deleteIcon} alt="editIcon" />
              </button>
              <button>
                <img src={deleteIcon} alt="deleteIcon" />
              </button>
            </div>
          )}
        </>
      ),
      Footer: "Actions",
    },
  ];

  return (
    <div className={classes.tableContainer}>
      <header className={classes.tableHeader}>
        <h1>User</h1>
        <input className={classes.search} type="text" placeholder="Search..." />
      </header>
      <Table columns={m_columns} data={Mock_data} />
    </div>
  );
};

export default UserContent;
