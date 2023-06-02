import { useEffect, useState } from "react";
import Table from "../../UI/table/Table";
import classes from "./BuildingContent.module.css";
import axios from "axios";

const BuildingContent = () => {
  const [buildingData, setBuildingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get("https://localhost:7124/api/buildings")
          .then((response) => {
            console.log(response.body);
            setBuildingData(response.data);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
      <Table columns={columnDefinition} data={buildingData} />;
    </div>
  );
};

export default BuildingContent;
