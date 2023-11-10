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
  useEffect(() => {
    const fetchSpaceData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7124/api/spaceimage/get/${props.onData[0]?.id}`
        );
        setSpaceData(response.data);
        console.log("response space data12 >>>>> ", response.data);
        evaluate("data:image/png;base64," + response.data[0].image);
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
