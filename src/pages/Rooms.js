import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/UI/Card/Card";
import axios from "axios";
import classes from "../components/buildings/Buildings.module.css";

const Rooms = () => {
  const [roomData, setRoomData] = useState([]);
  const params = useParams();
  console.log(roomData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://localhost:7124/api/rooms");
        console.log(response);
        setRoomData(
          response.data.filter(
            (data) => data.buildingId === parseInt(params.buildingId)
          )
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [params.buildingId]);

  const handleBackButtonClick = () => {
    window.history.back();
  };

  return (
    <div className={classes.buildingsContainer}>
      <div className={classes.buildingsContainer_header}>
        <h3>Rooms</h3>
        <button onClick={handleBackButtonClick}>Back</button>
      </div>
      <div className={classes.buildingsContainer_lists}>
        {roomData?.map((room) => (
          <Card className={classes.buildingsContainer_cards} key={room.id}>
            <h4>{room.roomNumber}</h4>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Rooms;
