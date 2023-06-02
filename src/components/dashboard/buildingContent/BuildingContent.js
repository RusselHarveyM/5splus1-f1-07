import { useContext } from "react";
import Table from "../../UI/table/Table";
import classes from "./BuildingContent.module.css";
import BuildingContext from "../../../context/building-context";

const BuildingContent = () => {
  const buildingCtx = useContext(BuildingContext);

  const columnDefinition = [
    { Header: "Id", accessor: "id" },
    { Header: "Name", accessor: "buildingName" },
    { Header: "Code", accessor: "buildingCode" },
  ];

  return (
    <div className={classes.tableContainer}>
      <header className={classes.tableHeader}>
        <h1>Buildings</h1>
      </header>
      <Table columns={columnDefinition} data={buildingCtx.buildingData} />;
    </div>
  );
};

export default BuildingContent;
