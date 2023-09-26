import classes from "./DashBoardContent.module.css";
import Card from "../UI/Card/Card";
import axios from "axios";
import BuildingContext from "../../context/building-context";
import { useEffect, useState, useContext } from "react";

const DashBoardContent = () => {
  const [roomsData, setRoomsData] = useState([]);
  const buildingCtx = useContext(BuildingContext);
  console.log("test >> ", buildingCtx);

  const fetchRooms = async () => {
    try {
      await axios.get(`https://localhost:7124/api/rooms`).then((response) => {
        setRoomsData(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <>
      <section className={classes.dashboardCards}>
        <Card className={classes.item1}>
          <h1>{roomsData.length}</h1>
          <h2>Rooms</h2>
        </Card>
        <Card className={classes.item2} />
        <Card className={classes.item3} />
        <Card className={classes.item4} />
      </section>
      <div className={classes.buildingList}>
        <div>
          <h2 className={classes.containerTitle}>BUILDINGS</h2>
        </div>
        <div>
          {buildingCtx.buildingData.map((building) => (
            <Card key={building.id}>
              <h3>{building.buildingName}</h3>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default DashBoardContent;
