import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Card from "../components/UI/Card/Card";
import classes from "../components/rooms/room/Room.module.css";
import SpaceNavContent from "../components/rooms/room/SpaceNavContent";
import Accordion from "../components/UI/Accordion/Accordion";

const Room = () => {
  const [roomData, setRoomData] = useState();
  const [spaces, setSpaces] = useState([]);
  const [space, setSpace] = useState();
  const [spaceId, setSpaceId] = useState();
  const [overallRating, setOverallRating] = useState(0.0);
  const [remark, setRemark] = useState("NOT CALIBRATED");

  const [rate, setRate] = useState({});

  const params = useParams();

  const onScoreHandler = useCallback(async (raw5s) => {
    const newRate = {
      sort: 0,
      setInOrder: 0,
      shine: 0,
      standarize: 0,
      sustain: 0,
      security: 0,
      isActive: true,
      spaceId: spaceId,
    };
    // Split the text into lines
    const lines = raw5s.split("\n");
    let i = 0;

    lines.forEach((line) => {
      const match = line.match(/- (\w+) \(\w+\): (\d+)/);
      if (match && i < 4) {
        const property = match[1].toLowerCase();
        const score = match[2];
        const properties = ["sort", "setInOrder", "shine", "standarize"];
        console.log("property:" + property);
        console.log("score:" + score);
        let props = properties[i];
        newRate[props] = score;
        i++;
      }
    });
    console.log("new rate", newRate);
    setRate(newRate);
    if (space.scores.length == 0) {
      try {
        const response = await axios.post(
          "https://localhost:7124/api/ratings",
          newRate
        );
        console.log("response rate", response);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await axios.put(
          `https://localhost:7124/api/ratings/${space.scores.id}`,
          newRate
        );
        console.log("response rate update", response);
      } catch (error) {
        console.log(error);
      }
    }
  });

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7124/api/rooms/${params.roomId}/room`
        );
        setRoomData(response.data);
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

  const onSpaceNavHandler = useCallback(
    async (res) => {
      setSpaceId(res.target.id);
      const space = spaces.filter((space) => space.id == res.target.id);

      try {
        const response = await axios.get(`https://localhost:7124/api/ratings`);
        console.log("response.data", response.data);
        if (response.data.length > 0) {
          const scores = response.data.filter(
            (score) => score.spaceId == res.target.id
          );
          console.log("scores", scores);
          setSpace({ space: space[0], scores: scores[0] });
        } else {
          setSpace({ space: space[0], scores: [] });
        }
      } catch (error) {
        console.log(error);
      }
    },
    [space, spaces, spaceId]
  );

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
        <SpaceNavContent onData={space} onScoreHandler={onScoreHandler} />
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
