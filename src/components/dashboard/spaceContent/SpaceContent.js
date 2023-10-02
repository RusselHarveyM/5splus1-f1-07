import { useState, useCallback, useEffect, useMemo } from "react";
import ReactDom from "react-dom";
import axios from "axios";
import Table from "../../UI/table/Table";
import classes from "../Content.module.css";
import Backdrop from "../../UI/Modal/BackdropModal";
import Overlay from "../../UI/Modal/BuildingOverlay";
import action from "../../../static/images/link.png";
import deleteIcon from "../../../static/images/delete.png";
import editIcon from "../../../static/images/edit.png";
import addIcon from "../../../static/images/add-building-2.png";

const SpaceContent = () => {
  const [spaceData, setSpaceData] = useState([]);
  const [clickedData, setClickedData] = useState();
  const [actionBtns, setActionBtns] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [refreshData, setRefreshData] = useState(false);

  const fetchSpaces = useCallback(async () => {
    const response = await axios.get(`https://localhost:7124/api/space`);
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
    fetchSpaces().then((list) => {
      setSpaceData(list);
      setRefreshData(false);
    });
  }, [fetchSpaces, refreshData]);

  const deleteSpace = useCallback(async (name) => {
    try {
      await axios.delete(`https://localhost:7124/api/space/${name}`);
      setRefreshData(true);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const updateSpace = useCallback(
    async (id, data) => {
      try {
        await axios.put(`https://localhost:7124/api/space/${id}`, {
          ...data,
        });
        setRefreshData(!refreshData);
      } catch (error) {
        console.log(error);
      }
    },
    [refreshData]
  );

  const addSpace = useCallback(
    async (data) => {
      try {
        await axios.post(`https://localhost:7124/api/space`, { ...data });
        setRefreshData(!refreshData);
      } catch (error) {
        console.log(error);
      }
    },
    [refreshData]
  );

  const onDeleteSpace = useCallback(() => {
    setIsModalOpen(true);
    setIsDelete(true);
  }, []);

  const onEditSpace = useCallback(() => {
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

  const onAddSpace = useCallback(() => {
    setIsModalOpen(true);
    setIsAdd(true);
  }, []);

  const columnDefinition = useMemo(
    () => [
      { Header: "Id", accessor: "id" },
      { Header: "Room Id", accessor: "roomId" },
      { Header: "Name", accessor: "name" },
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
                <button onClick={onEditSpace}>
                  <img src={editIcon} alt="editIcon" />
                </button>
                <button onClick={onDeleteSpace}>
                  <img src={deleteIcon} alt="deleteIcon" />
                </button>
              </div>
            )}
          </div>
        ),
      },
    ],
    [actionBtns, ActionBtnHandler, onDeleteSpace, onEditSpace]
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
              onDelete={deleteSpace}
              onUpdate={updateSpace}
              onConfirm={closeModal}
              onCreate={addSpace}
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
          <h1>Space</h1>
          <button onClick={onAddSpace} className={classes.addBtn}>
            <img src={addIcon} alt="addIcon" />
          </button>
        </div>
      </header>
      <Table columns={columnDefinition} data={spaceData} />;
    </div>
  );
};

export default SpaceContent;
