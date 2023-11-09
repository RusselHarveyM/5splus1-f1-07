import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Card from "../components/UI/Card/Card";
import classes from "../components/rooms/room/Room.module.css";
import SpaceNavContent from "../components/rooms/room/SpaceNavContent";
import Accordion from "../components/UI/Accordion/Accordion";

const Room = () => {
  const [roomData, setRoomData] = useState();
  const [spaces, setSpaces] = useState([]);
  const [spaceId, setSpaceId] = useState();
  const [overallRating, setOverallRating] = useState(0.0);
  const [remark, setRemark] = useState("NOT CALIBRATED");
  const params = useParams();

  console.log(params);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7124/api/rooms/${params.roomId}/room`
        );
        setRoomData(response.data);
        console.log("response data >>>>> ", response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRoomData();
  }, [params.roomId]);

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await axios.get(`https://localhost:7124/api/space`);
        console.log("space response", response);
        setSpaces(() => {
          return response.data.filter((space) => space.roomId === roomData?.id);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchSpaces();
  }, [roomData?.id]);

  const handleBackButtonClick = () => {
    window.history.back();
  };

  const onSpaceNavHandler = (res) => {
    setSpaceId(res.target.id);
  };

  return (
    <div className={classes.roomContainer}>
      <Card className={classes.roomContainer_header}>
        <button
          onClick={handleBackButtonClick}
          className={classes.backButton}
        ></button>
        <img
          src={`data:image/png;base64,${roomData?.image}`}
          alt="room preview"
        />
        <h1>{roomData?.roomNumber}</h1>
      </Card>
      <div className={classes.roomContainer_spaces}>
        <Card className={classes.spaceNavigation}>
          <h2>Spaces</h2>
          <div className={classes.spaceNavigation_list}>
            {spaces?.map((space) => (
              <button key={space.id} id={space.id} onClick={onSpaceNavHandler}>
                {space.name}
              </button>
            ))}
          </div>
        </Card>
        <SpaceNavContent
          onData={spaces.filter((space) => space.id == spaceId)}
        />
      </div>
      <div className={classes.roomContainer_ratings}>
        <div className={classes.roomContainer_ratings_rating}>
          <h1>{overallRating}</h1>
          <h3>{remark}</h3>
        </div>
        <h1>5S+ Rating</h1>
        <Accordion />
      </div>
      <div className={classes.roomContainer_redTags}></div>
    </div>
  );
};

export default Room;
