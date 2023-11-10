import React, { useState, useEffect, useCallback } from "react";
import ReactDom from "react-dom";
import classes from "./SpaceNavContent.module.css";
import Card from "../../UI/Card/Card";
import axios from "axios";
import { useParams } from "react-router-dom";
import evaluate from "./evaluate.js";

import Backdrop from "../../UI/Modal/BackdropModal.js";
import ViewImageOverlay from "../../UI/Modal/ViewImageOverlay.js";

const SpaceNavContent = (props) => {
  const [spaceTotalScore, setSpaceTotalScore] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const params = useParams();
  const [spaceData, setSpaceData] = useState();
  let raw5s = "";
  // let _5s = {
  //     "Sort": {score: "", comment: "a"},
  //     "SIO": {score: "", comment: "a"},
  //     "Shine": {score: "", comment: "a"},
  //     "Standardize": {score: "  ", comment: "a"},
  //     "Sustain": {score: 10, comment: "a"}
  // }

  let sort = { score: "", comment: "" };
  let SIO = { score: "", comment: "" };
  let shine = { score: "", comment: "" };
  let standardize = { score: "", comment: "" };
  let sustain = { score: "", comment: "" };
  useEffect(() => {
    const fetchSpaceData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7124/api/spaceimage/get/${props.onData[0]?.id}`
        );
        setSpaceData(response.data);
        console.log("response space data12 >>>>> ", response.data);
        raw5s = await evaluate(
          "data:image/png;base64," +
            response.data[0].image +
            "data:image/png;base64," +
            response.data[1].image
        );

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
              sort.score = scoreMatch[i];
              i++;
            } else if (i === 1) {
              SIO.score = scoreMatch[i];
              i++;
            } else if (i === 2) {
              shine.score = scoreMatch[i];
              i++;
            } else if (i === 3) {
              let test = scoreMatch[i];
              console.log(test);
              standardize.score = scoreMatch[i];
              i++;
            }
          }
          // if (line.startsWith('- ')) {
          //       const comment = line.replace('- ', '');
          //       for (const key in _5s) {
          //           if (comment.includes(key)) {
          //               _5s[key].comment = comment;
          //           }
          //       }
          //   }
        });
        // _5s.Sort.score = scoreMatch[0];
        // _5s.SIO.score = scoreMatch[1];
        // _5s.Shine.score = scoreMatch[2];
        // _5s.Standardize.score = scoreMatch[3];
        console.log(sort);
        console.log(SIO);
        console.log(shine);
        console.log(standardize);
        console.log(sustain);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSpaceData();
  }, [props.onData[0]?.id]);

  const onViewImageHandler = useCallback(() => {
    setIsModalOpen(true);
  }, []);
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // console.log("params.spaceId >>>", props.onData);
  console.log(raw5s);
  console.log("props {}{}{{}", props);
  return (
    <Card className={classes.spaceNavigation_content}>
      {isModalOpen && (
        <>
          {ReactDom.createPortal(
            <Backdrop onConfirm={closeModal} />,
            document.getElementById("backdrop-root")
          )}
          {ReactDom.createPortal(
            <ViewImageOverlay spaceData={spaceData} />,
            document.getElementById("overlay-root")
          )}
        </>
      )}
      <header className={classes.spaceTitle}>
        <h2>
          {props.onData[0]?.name}
          <sup className={classes.spaceScore}>0.0/10</sup>
        </h2>
        <div className={classes.spaceTitle_buttons}>
          <button>Update Images</button>
          <button onClick={onViewImageHandler}>View Images</button>
        </div>
      </header>
      <div className={classes.spaceBody}>
        <Card className={classes.sort}>
          <div className={classes.scoreTitle}>
            <h3>SORT</h3>
          </div>
          {/* score here */}
          <h3>/{spaceTotalScore}</h3>
        </Card>
        <Card className={classes.sio}>
          <div className={classes.scoreTitle}>
            <h3>SET IN ORDER</h3>
          </div>
          {/* score here */}
          <h3>/{spaceTotalScore}</h3>
        </Card>
        <Card className={classes.shine}>
          <div className={classes.scoreTitle}>
            <h3>SHINE</h3>
          </div>
          {/* score here */}
          <h3>/{spaceTotalScore}</h3>
        </Card>
        <Card className={classes.standardize}>
          <div className={classes.scoreTitle}>
            <h3>STANDARDIZE</h3>
          </div>
          {/* score here */}
          <h3>/{spaceTotalScore}</h3>
        </Card>
        <Card className={classes.sustain}>
          <div className={classes.scoreTitle}>
            <h3>SUSTAIN</h3>
          </div>
          {/* score here */}
          <h3>/{spaceTotalScore}</h3>
        </Card>
        <Card className={classes.safety}>
          <div className={classes.scoreTitle}>
            <h3>SAFETY</h3>
          </div>
          {/* score here */}
          <h3>/{spaceTotalScore}</h3>
        </Card>
      </div>
    </Card>
  );
};

export default SpaceNavContent;
