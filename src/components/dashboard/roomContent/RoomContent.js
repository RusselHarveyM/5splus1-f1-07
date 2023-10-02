import React from "react";
import classes from "../Content.module.css";

import { useState, useCallback, useEffect, useMemo } from "react";
import ReactDom from "react-dom";
import axios from "axios";
import PropTypes from "prop-types";
import Table from "../../UI/table/Table";
import Backdrop from "../../UI/Modal/BackdropModal";
import Overlay from "../../UI/Modal/RoomOverlay";
import action from "../../../static/images/link.png";
import deleteIcon from "../../../static/images/delete.png";
import editIcon from "../../../static/images/edit.png";
import addIcon from "../../../static/images/add-room.png";

const RoomContent = ({ onData }) => {
  const [roomData, setRoomData] = useState([]);
  const [clickedData, setClickedData] = useState();
  const [actionBtns, setActionBtns] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [refreshData, setRefreshData] = useState(false);

  const fetchRooms = useCallback(async () => {
    const response = await axios.get(`https://localhost:7124/api/rooms`);
    return response.data;
  }, []);

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

  useEffect(() => {
    fetchRooms().then((list) => {
      setRoomData(list);
      setRefreshData(false);
      onData(list);
    });
  }, [fetchRooms, onData, refreshData]);

  const deleteRoom = useCallback(async (name) => {
    try {
      await axios.delete(`https://localhost:7124/api/rooms/${name}`);
      setRefreshData(true);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const updateRoom = useCallback(
    async (id, data) => {
      try {
        await axios.put(`https://localhost:7124/api/rooms/${id}`, {
          ...data,
        });
        setRefreshData(!refreshData);
      } catch (error) {
        console.log(error);
      }
    },
    [refreshData]
  );

  const addRoom = useCallback(
    async (data) => {
      try {
        await axios.post(`https://localhost:7124/api/rooms`, { ...data });
        setRefreshData(!refreshData);
      } catch (error) {
        console.log(error);
      }
    },
    [refreshData]
  );

  const onDeleteRoom = useCallback(() => {
    setIsModalOpen(true);
    setIsDelete(true);
  }, []);

  const onEditRoom = useCallback(() => {
    setIsModalOpen(true);
    setIsEdit(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setIsDelete(false);
    setIsEdit(false);
    setIsAdd(false);
    setActionBtns({});
  }, []);

  const onAddRoom = useCallback(() => {
    setIsModalOpen(true);
    setIsAdd(true);
  }, []);

  const columnDefinition = useMemo(
    () => [
      { Header: "Id", accessor: "id" },
      { Header: "Building Id", accessor: "buildingId" },
      { Header: "Room name", accessor: "roomNumber" },
      { Header: "Status", accessor: "status" },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className={classes.actionCell}>
            {!actionBtns[row.original["id"]] ? (
              <button
                onClick={() =>
                  ActionBtnHandler(row.original["id"], row.original)
                }
                className={classes.actionBtn}
              >
                <img src={action} alt="actionIcon" />
              </button>
            ) : (
              <div
                className={`${classes.actionBtnChoices} ${classes.actionBtn}`}
              >
                <button onClick={onEditRoom}>
                  <img src={editIcon} alt="editIcon" />
                </button>
                <button onClick={onDeleteRoom}>
                  <img src={deleteIcon} alt="deleteIcon" />
                </button>
              </div>
            )}
          </div>
        ),
      },
    ],
    [actionBtns, ActionBtnHandler, onDeleteRoom, onEditRoom]
  );

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
              onDelete={deleteRoom}
              onUpdate={updateRoom}
              onConfirm={closeModal}
              onCreate={addRoom}
              data={clickedData}
              roomId={Object.keys(actionBtns).find(
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
        <div className={classes.createEntity}>
          <h1>Rooms</h1>
          <button onClick={onAddRoom} className={classes.addBtn}>
            <img src={addIcon} alt="addIcon" />
          </button>
        </div>
      </header>
      <Table columns={columnDefinition} data={roomData} />;
    </div>
  );
};

RoomContent.propTypes = {
  onData: PropTypes.func.isRequired,
};

export default RoomContent;
