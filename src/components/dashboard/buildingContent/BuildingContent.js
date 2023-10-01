import { useState, useCallback, useEffect, useMemo } from "react";
import ReactDom from "react-dom";
import axios from "axios";
import PropTypes from "prop-types";
import Table from "../../UI/table/Table";
import classes from "./BuildingContent.module.css";
import Backdrop from "../../UI/Modal/BackdropModal";
import Overlay from "../../UI/Modal/BuildingOverlay";
import action from "../../../static/images/link.png";
import deleteIcon from "../../../static/images/delete.png";
import editIcon from "../../../static/images/edit.png";
import addIcon from "../../../static/images/add-user.png";

const BuildingContent = ({ onData }) => {
  const [buildingData, setBuildingData] = useState([]);
  const [clickedData, setClickedData] = useState();
  const [actionBtns, setActionBtns] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [refreshData, setRefreshData] = useState(false);

  const fetchBuildings = useCallback(async () => {
    const response = await axios.get(`https://localhost:7124/api/buildings`);
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
    fetchBuildings().then((list) => {
      setBuildingData(list);
      setRefreshData(false);
      onData(list);
    });
  }, [fetchBuildings, onData, refreshData]);

  const deleteBuilding = useCallback(async (name) => {
    try {
      await axios.delete(`https://localhost:7124/api/buildings/${name}`);
      setRefreshData(true);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const updateBuilding = useCallback(
    async (id, data) => {
      try {
        await axios.put(`https://localhost:7124/api/buildings/${id}`, {
          ...data,
        });
        setRefreshData(!refreshData);
      } catch (error) {
        console.log(error);
      }
    },
    [refreshData]
  );

  const addBuilding = useCallback(
    async (data) => {
      try {
        await axios.post(`https://localhost:7124/api/buildings`, { ...data });
        setRefreshData(!refreshData);
      } catch (error) {
        console.log(error);
      }
    },
    [refreshData]
  );

  const onDeleteBuilding = useCallback(() => {
    setIsModalOpen(true);
    setIsDelete(true);
  }, []);

  const onEditBuilding = useCallback(() => {
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

  const onAddBuilding = useCallback(() => {
    setIsModalOpen(true);
    setIsAdd(true);
  }, []);

  const columnDefinition = useMemo(
    () => [
      { Header: "Id", accessor: "id" },
      { Header: "Name", accessor: "buildingName" },
      { Header: "Code", accessor: "buildingCode" },
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
                <button onClick={onEditBuilding}>
                  <img src={editIcon} alt="editIcon" />
                </button>
                <button onClick={onDeleteBuilding}>
                  <img src={deleteIcon} alt="deleteIcon" />
                </button>
              </div>
            )}
          </div>
        ),
      },
    ],
    [actionBtns, ActionBtnHandler, onDeleteBuilding, onEditBuilding]
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
              onDelete={deleteBuilding}
              onUpdate={updateBuilding}
              onConfirm={closeModal}
              onCreate={addBuilding}
              data={clickedData}
              buildingId={Object.keys(actionBtns).find(
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
        <div className={classes.createBuilding}>
          <h1>Buildings</h1>
          <button onClick={onAddBuilding} className={classes.addBtn}>
            <img src={addIcon} alt="addIcon" />
          </button>
        </div>
      </header>
      <Table columns={columnDefinition} data={buildingData} />;
    </div>
  );
};

BuildingContent.propTypes = {
  onData: PropTypes.func.isRequired,
};

export default BuildingContent;
