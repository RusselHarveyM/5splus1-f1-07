import { useState, useCallback, useEffect, useMemo } from "react";
import ReactDom from "react-dom";
import axios from "axios";
import PropTypes from "prop-types";
import Table from "../UI/table/Table";
import classes from "./Content.module.css";
import Backdrop from "../UI/Modal/BackdropModal";
import Overlay from "../UI/Modal/BuildingOverlay";
import action from "../../static/images/link.png";
import deleteIcon from "../../static/images/delete.png";
import editIcon from "../../static/images/edit.png";

const Content = ({ url, headers, onData, title, addIcon }) => {
  const [contentData, setContentData] = useState([]);
  const [clickedData, setClickedData] = useState();
  const [actionBtns, setActionBtns] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [refreshData, setRefreshData] = useState(false);

  const fetchContent = useCallback(async () => {
    const response = await axios.get(url);
    return response.data;
  }, [url]);

  const ActionBtnHandler = useCallback(
    (rowId, data) => {
      setClickedData(data);
      setActionBtns((prevState) => ({
        ...prevState,
        [rowId]: !prevState[rowId],
      }));
    },
    [setActionBtns]
  );

  useEffect(() => {
    fetchContent().then((list) => {
      setContentData(list);
      setRefreshData(false);
      onData(list);
    });
  }, [fetchContent, onData, refreshData]);

  const deleteContent = useCallback(
    async (name) => {
      try {
        await axios.delete(url + name);
        setRefreshData(true);
      } catch (error) {
        console.log(error);
      }
    },
    [url]
  );

  const updateContent = useCallback(
    async (id, data) => {
      try {
        await axios.put(url + id, {
          ...data,
        });
        setRefreshData(!refreshData);
      } catch (error) {
        console.log(error);
      }
    },
    [refreshData, url]
  );

  const addContent = useCallback(
    async (data) => {
      try {
        await axios.post(url, { ...data });
        setRefreshData(!refreshData);
      } catch (error) {
        console.log(error);
      }
    },
    [url, refreshData]
  );

  const onDeleteContent = useCallback(() => {
    setIsModalOpen(true);
    setIsDelete(true);
  }, []);

  const onEditContent = useCallback(() => {
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

  const onAddContent = useCallback(() => {
    setIsModalOpen(true);
    setIsAdd(true);
  }, []);

  const columnDefinition = useMemo(
    () => [
      ...headers,
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
                <button onClick={onEditContent}>
                  <img src={editIcon} alt="editIcon" />
                </button>
                <button onClick={onDeleteContent}>
                  <img src={deleteIcon} alt="deleteIcon" />
                </button>
              </div>
            )}
          </div>
        ),
      },
    ],
    [actionBtns, ActionBtnHandler, onDeleteContent, onEditContent, headers]
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
              onDelete={deleteContent}
              onUpdate={updateContent}
              onConfirm={closeModal}
              onCreate={addContent}
              data={clickedData}
              contentId={Object.keys(actionBtns).find(
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
          <h1>{title}</h1>
          <button onClick={onAddContent} className={classes.addBtn}>
            <img src={addIcon} alt="addIcon" />
          </button>
        </div>
      </header>
      <Table columns={columnDefinition} data={contentData} />
    </div>
  );
};

Content.propTypes = {
  onData: PropTypes.func.isRequired,
};

export default Content;
