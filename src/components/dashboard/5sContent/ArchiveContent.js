import { useState, useCallback, useEffect, useMemo } from "react";
import ReactDom from "react-dom";
import axios from "axios";
import Table from "../../UI/table/Table";
import classes from "../Content.module.css";
import Backdrop from "../../UI/Modal/BackdropModal";
import Overlay from "../../UI/Modal/ArchiveOverlay";
import action from "../../../static/images/link.png";
import deleteIcon from "../../../static/images/delete.png";
import editIcon from "../../../static/images/edit.png";

const ArchiveContent = () => {
  const [archiveData, setArchiveData] = useState([]);
  const [clickedData, setClickedData] = useState();
  const [actionBtns, setActionBtns] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [refreshData, setRefreshData] = useState(false);

  const fetchArchive = useCallback(async () => {
    const response = await axios.get(`https://localhost:7124/api/ratings`);
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
    fetchArchive().then((list) => {
      setArchiveData(list);
      setRefreshData(false);
    });
  }, [fetchArchive, refreshData]);

  const deleteArchive = useCallback(async (id) => {
    try {
      await axios.delete(`https://localhost:7124/api/ratings/${id}`);
      setRefreshData(true);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const updateArchive = useCallback(
    async (id, data) => {
      try {
        await axios.put(`https://localhost:7124/api/comment/${id}`, {
          ...data,
        });
        setRefreshData(!refreshData);
      } catch (error) {
        console.log(error);
      }
    },
    [refreshData]
  );

  const addArchive = useCallback(
    async (data) => {
      try {
        await axios.post(`https://localhost:7124/api/ratings`, { ...data });
        setRefreshData(!refreshData);
      } catch (error) {
        console.log(error);
      }
    },
    [refreshData]
  );

  const onDeleteArchive = useCallback(() => {
    setIsModalOpen(true);
    setIsDelete(true);
  }, []);

  const onEditArchive = useCallback(() => {
    setIsModalOpen(true);
    setIsEdit(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setIsDelete(false);
    setIsEdit(false);
    // setIsAdd(false);
    setActionBtns({});
  }, []);

  // const onAddArchive = useCallback(() => {
  //   setIsModalOpen(true);
  //   setIsAdd(true);
  // }, []);

  const columnDefinition = useMemo(
    () => [
      { Header: "Id", accessor: "id" },
      { Header: "Space Id", accessor: "spaceId" },
      { Header: "Sort", accessor: "sort" },
      { Header: "Set In Order", accessor: "setInOrder" },
      { Header: "Shine", accessor: "shine" },
      { Header: "Standarize", accessor: "standarize" },
      { Header: "Sustain", accessor: "sustain" },
      { Header: "Security", accessor: "security" },
      { Header: "Date Modified", accessor: "dateModified" },
      {
        Header: "Action",
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
                <button onClick={onEditArchive}>
                  <img src={editIcon} alt="editIcon" />
                </button>
                <button onClick={onDeleteArchive}>
                  <img src={deleteIcon} alt="deleteIcon" />
                </button>
              </div>
            )}
          </div>
        ),
      },
    ],
    [actionBtns, ActionBtnHandler, onDeleteArchive, onEditArchive]
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
              onDelete={deleteArchive}
              onUpdate={updateArchive}
              onConfirm={closeModal}
              onCreate={addArchive}
              data={clickedData}
              archiveId={Object.keys(actionBtns).find(
                (key) => actionBtns[key] === true
              )}
              status={
                `${isDelete ? "delete" : ""}` || `${isEdit ? "edit" : ""}`
              }
            />,
            document.getElementById("overlay-root")
          )}
        </>
      )}
      <header className={classes.tableHeader}>
        <div className={classes.createEntity}>
          <h1>Buildings</h1>
          {/* <button onClick={onAddArchive} className={classes.addBtn}>
            <img src={addIcon} alt="addIcon" />
          </button> */}
        </div>
      </header>
      <Table columns={columnDefinition} data={archiveData} />;
    </div>
  );
};

export default ArchiveContent;
