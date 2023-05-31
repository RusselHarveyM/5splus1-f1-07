import Mock_data from "../../MOCK_DATA.json";
import ReactDom from "react-dom";
import Table from "../../UI/table/Table";
import classes from "./UserContent.module.css";
import action from "../../../static/images/link.png";
import deleteIcon from "../../../static/images/delete.png";
import editIcon from "../../../static/images/edit.png";

import React, { useState, useCallback, useEffect } from "react";
import GlobalFilter from "../../GlobalFilter";
import Backdrop from "../../UI/Modal/BackdropModal";

import axios from "axios";
import Overlay from "../../UI/Modal/Overlay";

const UserContent = () => {
  const [actionBtns, setActionBtns] = useState({});
  const [userData, setUserData] = useState([]);
  const [filter, setFilter] = useState({ filter: "default", setFil: () => {} });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [refreshData, setRefreshData] = useState(false);

  const ActionBtnHandler = useCallback(
    (rowId) => {
      console.log(actionBtns);
      setActionBtns((prevState) => ({
        ...Object.keys(prevState).reduce((acc, key) => {
          acc[key] = false;
          return acc;
        }, {}),
        [rowId]: !prevState[rowId],
      }));
    },
    [setActionBtns, actionBtns]
  );

  const fetchUsers = useCallback(async () => {
    const response = await axios.get(`https://localhost:7124/api/user`);
    return response.data;
  }, []);

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `https://localhost:7124/api/user/${id}`
      );
      console.log(response);
      setRefreshData(true);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (id, data) => {
    try {
      const response = await axios.put(
        `https://localhost:7124/api/user/${id}`,
        data
      );
      console.log(response);
      setRefreshData(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers()
      .then((list) => {
        console.log(list);
        setUserData(list);
        setRefreshData(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [fetchUsers, refreshData]);

  const m_columns = [
    {
      Header: "Id",
      accessor: "id",
    },
    {
      Header: "Last Name",
      accessor: "lastName",
    },
    {
      Header: "First Name",
      accessor: "firstName",
    },
    {
      Header: "Username",
      accessor: "username",
    },
    {
      Header: "Actions",
      Cell: ({ row }) => {
        return (
          <div className={classes.actionCell}>
            {!actionBtns[row.original["id"]] ? (
              <button
                onClick={() => {
                  ActionBtnHandler(row.original["id"]);
                }}
                className={classes.actionBtn}
              >
                <img src={action} alt="actionIcon" />
              </button>
            ) : (
              <div
                className={classes.actionBtnChoices + " " + classes.actionBtn}
              >
                <button onClick={onEditUser}>
                  <img src={editIcon} alt="editIcon" />
                </button>
                <button onClick={onDeleteUser}>
                  <img src={deleteIcon} alt="deleteIcon" />
                </button>
              </div>
            )}
          </div>
        );
      },
    },
  ];

  const onDeleteUser = () => {
    setIsModalOpen(true);
    setIsDelete(true);
  };
  const onEditUser = () => {
    setIsModalOpen(true);
    setIsEdit(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsDelete(false);
    setIsEdit(false);
  };

  const filterHandler = (fil, setFil) => {
    setFilter({ filter: fil, setFil: setFil });
  };

  return (
    <div className={classes.tableContainer}>
      {isModalOpen && (
        <>
          {ReactDom.createPortal(
            <Backdrop onConfirm={closeModal} />,
            document.getElementById("backdrop-root")
          )}
          {ReactDom.createPortal(
            <Overlay
              onDelete={deleteUser}
              onConfirm={closeModal}
              userId={Object.keys(actionBtns).find(
                (key) => actionBtns[key] === true
              )}
              status={`${isDelete ? "delete" : "edit"}`}
            />,
            document.getElementById("overlay-root")
          )}
        </>
      )}
      <header className={classes.tableHeader}>
        <h1>User</h1>
        <GlobalFilter filter={filter.filter} setFilter={filter.setFil} />
      </header>
      <Table
        columns={m_columns}
        data={userData}
        filter={filter.filter}
        filterHandler={filterHandler}
      />
    </div>
  );
};

export default React.memo(UserContent);
