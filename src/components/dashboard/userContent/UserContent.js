import React, { useState, useCallback, useEffect } from "react";
import ReactDom from "react-dom";
import axios from "axios";

import Table from "../../UI/table/Table";
import GlobalFilter from "../../GlobalFilter";
import Backdrop from "../../UI/Modal/BackdropModal";
import Overlay from "../../UI/Modal/UserOverlay";

import classes from "./UserContent.module.css";
import action from "../../../static/images/link.png";
import deleteIcon from "../../../static/images/delete.png";
import editIcon from "../../../static/images/edit.png";
import addIcon from "../../../static/images/add-user.png";

const UserContent = () => {
  const [actionBtns, setActionBtns] = useState({});
  const [userData, setUserData] = useState([]);
  const [filter, setFilter] = useState({ filter: "default", setFil: () => {} });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [clickedData, setClickedData] = useState();

  const ActionBtnHandler = useCallback(
    (rowId, data) => {
      setClickedData(data);
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

  const fetchUsers = useCallback(async () => {
    const response = await axios.get(`https://localhost:7124/api/user`);
    return response.data;
  }, []);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://localhost:7124/api/user/${id}`);
      setRefreshData(true);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (id, data) => {
    try {
      await axios.put(`https://localhost:7124/api/user/${id}`, { ...data });
      setRefreshData(!refreshData);
    } catch (error) {
      console.log(error);
    }
  };

  const addUser = async (data) => {
    try {
      await axios.post(`https://localhost:7124/api/user`, { ...data });
      setRefreshData(!refreshData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers()
      .then((list) => {
        setUserData(list);
        setRefreshData(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [fetchUsers, refreshData]);

  const m_columns = [
    { Header: "Id", accessor: "id" },
    { Header: "Last Name", accessor: "lastName" },
    { Header: "First Name", accessor: "firstName" },
    { Header: "Username", accessor: "username" },
    {
      Header: "Actions",
      Cell: ({ row }) => (
        <div className={classes.actionCell}>
          {!actionBtns[row.original["id"]] ? (
            <button
              onClick={() => ActionBtnHandler(row.original["id"], row.original)}
              className={classes.actionBtn}
            >
              <img src={action} alt="actionIcon" />
            </button>
          ) : (
            <div className={`${classes.actionBtnChoices} ${classes.actionBtn}`}>
              <button onClick={onEditUser}>
                <img src={editIcon} alt="editIcon" />
              </button>
              <button onClick={onDeleteUser}>
                <img src={deleteIcon} alt="deleteIcon" />
              </button>
            </div>
          )}
        </div>
      ),
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
    setIsAdd(false);
    setActionBtns({});
  };

  const onAddUser = () => {
    setIsModalOpen(true);
    setIsAdd(true);
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
              onUpdate={updateUser}
              onConfirm={closeModal}
              onCreate={addUser}
              data={clickedData}
              userId={Object.keys(actionBtns).find(
                (key) => actionBtns[key] === true
              )}
              status={
                `${isDelete ? "delete" : ""}` ||
                `${isEdit ? "edit" : ""}` ||
                `${isAdd ? "create" : ""}`
              }
            />,
            document.getElementById("overlay-root")
          )}
        </>
      )}
      <header className={classes.tableHeader}>
        <div className={classes.createUser}>
          <h1>User</h1>
          <button onClick={onAddUser} className={classes.addBtn}>
            <img src={addIcon} alt="addIcon" />
          </button>
        </div>
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
