import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Card from "../components/UI/Card/Card";
import classes from "../components/rooms/room/Room.module.css";
import SpaceNavContent from "../components/rooms/room/SpaceNavContent";
import Accordion from "../components/UI/Accordion/Accordion";
import { set } from "date-fns";

const Room = () => {
  const [roomData, setRoomData] = useState();
  const [spaces, setSpaces] = useState([]);
  const [space, setSpace] = useState();
  const [spaceId, setSpaceId] = useState();
  const [overallRating, setOverallRating] = useState(0.0);
  const [remark, setRemark] = useState("NOT CALIBRATED");
  const [fiveS, setFiveS] = useState({
    sort: { score: "", comment: "" },
    sio: { score: "", comment: "" },
    shine: { score: "", comment: "" },
    standardize: { score: "", comment: "" },
    sustain: { score: "", comment: "" },
  });

  const params = useParams();

  const onScoreHandler = (raw5s) => {
    const newSpace = spaces.filter((space) => space.id == spaceId);

    const newS = {
      sort: { score: "", comment: "" },
      sio: { score: "", comment: "" },
      shine: { score: "", comment: "" },
      standardize: { score: "", comment: "" },
      sustain: { score: "", comment: "" },
    };
    // Split the text into lines
    const lines = raw5s.split("\n");
    // console.log(lines)
    // Iterate through the lines and update the _5s dictionary
    let i = 0;
    let k = ["Sort", "SIO", "Shine", "Standardize", "Sustain"];
    lines.forEach((line) => {
      // Try to extract scores

      if (i <= 3) {
        const scoreMatch = line.match(/(\d+)/);
        console.log(scoreMatch);
        console.log("i:" + i);
        // console.log("k:"+ k[i])
        // _5s[k[i]].score = scoreMatch[i];
        // i++

        if (line.includes("Sort")) {
          newS.sort.score = scoreMatch[i];
          i++;
        } else if (i === 1) {
          newS.sio.score = scoreMatch[i];
          i++;
        } else if (i === 2) {
          newS.shine.score = scoreMatch[i];
          i++;
        } else if (i === 3) {
          let test = scoreMatch[i];
          console.log(test);
          newS.standardize.score = scoreMatch[i];
          i++;
        }
      }
      setSpace({ space: newSpace[0], scores: newS });
      setFiveS(newS);
      // if (line.startsWith('- ')) {
      //       const comment = line.replace('- ', '');
      //       for (const key in _5s) {
      //           if (comment.includes(key)) {
      //               _5s[key].comment = comment;
      //           }
      //       }
      //   }
    });
  };

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
          onData={
            space
              ? space
              : {
                  space: spaces.filter((space) => space.id == spaceId)[0],
                  scores: fiveS,
                }
          }
          onScoreHandler={onScoreHandler}
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
