import Mock_data from "../../MOCK_DATA.json";
import Table from "../../UI/table/Table";
import classes from "./UserContent.module.css";
import action from "../../../static/images/link.png";
import deleteIcon from "../../../static/images/delete.png";
import editIcon from "../../../static/images/edit.png";

import { useState, useCallback } from "react";
import GlobalFilter from "../../GlobalFilter";

const UserContent = () => {
  const [actionBtns, setActionBtns] = useState({});
  const [filter, setFilter] = useState({ filter: "default", setFil: () => {} });

  const ActionBtnHandler = useCallback(
    (rowId) => {
      setActionBtns((prevState) => ({
        ...Object.keys(prevState).reduce((acc, key) => {
          acc[key] = false;
          return acc;
        }, {}),
        [rowId]: !prevState[rowId],
      }));
    },
    [setActionBtns]
  );

  const m_columns = [
    {
      Header: "Id",
      accessor: "User Id",
    },
    {
      Header: "Last Name",
      accessor: "Last Name",
    },
    {
      Header: "First Name",
      accessor: "First Name",
    },
    {
      Header: "Username",
      accessor: "Username",
    },
    {
      Header: "Actions",
      Cell: ({ row }) => {
        return (
          <>
            {!actionBtns[row.original["User Id"]] ? (
              <button
                onClick={() => {
                  ActionBtnHandler(row.original["User Id"]);
                }}
                className={classes.actionBtn}
              >
                <img src={action} alt="actionIcon" />
              </button>
            ) : (
              <div
                className={classes.actionBtnChoices + " " + classes.actionBtn}
              >
                <button>
                  <img src={editIcon} alt="editIcon" />
                </button>
                <button>
                  <img src={deleteIcon} alt="deleteIcon" />
                </button>
              </div>
            )}
          </>
        );
      },
    },
  ];
  const filterHandler = (fil, setFil) => {
    setFilter({ filter: fil, setFil: setFil });
  };

  return (
    <div className={classes.tableContainer}>
      <header className={classes.tableHeader}>
        <h1>User</h1>
        <GlobalFilter filter={filter.filter} setFilter={filter.setFil} />
      </header>
      <Table
        columns={m_columns}
        data={Mock_data}
        filter={filter.filter}
        filterHandler={filterHandler}
      />
    </div>
  );
};

export default UserContent;
