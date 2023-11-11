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
  const [spaceRating, setSpaceRating] = useState(0.0);
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

    const newComment = {
      sort: "",
      setInOrder: "",
      shine: "",
      standarize: "",
      sustain: "",
      security: "",
      isActive: true,
      ratingId: space.scores.id,
    };

    // Split the text into lines
    const lines = raw5s.split("\n");
    let i = 0;
    let totalScore = 0;

    lines.forEach((line) => {
      const match = line.match(/- (\w+) \(\w+\): (\d+) \((.*?)\)/);
      if (match && i < 4) {
        const property = match[1].toLowerCase();
        const score = match[2];
        const comment = match[3]; // This is the extracted comment
        const properties = ["sort", "setInOrder", "shine", "standarize"];
        totalScore += score;
        console.log("property:" + property);
        console.log("score:" + score);
        console.log("comment:" + comment); // Log the comment
        let props = properties[i];
        newRate[props] = score;
        newComment[props] = comment; // Store the comment
        i++;
      }
    });
    setSpaceRating(totalScore / 4);
    console.log("new rate", newRate);
    setRate(newRate);
    if (space.scores.length == 0 && space.comments.length == 0) {
      try {
        const resRate = await axios.post(
          "https://localhost:7124/api/ratings",
          newRate
        );
        const resComment = await axios.post(
          "https://localhost:7124/api/comment",
          newComment
        );
        console.log("response rate", resRate);
        console.log("response comment", resComment);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const resRate = await axios.put(
          `https://localhost:7124/api/ratings/${space.scores.id}`,
          newRate
        );
        const resComment = await axios.put(
          `https://localhost:7124/api/comment/${space.comments.id}`,
          newComment
        );
        console.log("response rate update", resRate);
        console.log("response comment update", resComment);
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

      if (space.length === 0) {
        console.log("No space found with the given id");
        return;
      }

      try {
        const response = await axios.get(`https://localhost:7124/api/ratings`);
        const resComment = await axios.get(
          `https://localhost:7124/api/comment`
        );

        console.log("response.data", response.data);
        // if (response.data.length > 0 && resComment.data.length > 0) {
        const scores = response.data.filter(
          (score) => score.spaceId == res.target.id
        );
        const comments = resComment.data.filter(
          (comment) =>
            comment.ratingId == (scores.length > 0 ? scores[0].id : null)
        );

        // if (scores.length === 0 || comments.length === 0) {
        //   console.log("No scores or comments found for the given space id");
        //   return;
        // }

        console.log("scores", scores);
        console.log("comments", comments);
        setSpace({
          space: space[0],
          scores: scores ? scores[0] : [],
          comments: comments ? comments[0] : [],
        });
        // } else {
        //   setSpace({ space: space[0], scores: [], comments: [] });
        // }
      } catch (error) {
        console.log(error);
      }
    },
    [spaces]
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
        <SpaceNavContent
          onData={space}
          onScoreHandler={onScoreHandler}
          spaceRate={spaceRating}
        />
      </div>
      <div className={classes.roomContainer_ratings}>
        <div className={classes.roomContainer_ratings_rating}>
          <h1>{overallRating}</h1>
          <h3>{remark}</h3>
        </div>
        <h1>5S+ Rating</h1>
        <Accordion space={space} />
      </div>
      <div className={classes.roomContainer_redTags}></div>
    </div>
  );
};

export default Room;
