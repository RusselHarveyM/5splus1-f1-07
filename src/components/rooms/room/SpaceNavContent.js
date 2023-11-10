import React, { useState, useEffect, useCallback } from "react";
import ReactDom from "react-dom";
import classes from "./SpaceNavContent.module.css";
import Card from "../../UI/Card/Card";
import axios from "axios";
import { useParams } from "react-router-dom";

import Backdrop from "../../UI/Modal/BackdropModal.js";
import ViewImageOverlay from "../../UI/Modal/ViewImageOverlay.js";

const SpaceNavContent = (props) => {
  const [spaceTotalScore, setSpaceTotalScore] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const params = useParams();
  const [spaceData, setSpaceData] = useState();
  let raw5s = "";

  console.log("props.onData ;';';';", props.onData);

  useEffect(() => {
    const fetchSpaceData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7124/api/spaceimage/get/${props.onData?.space?.id}`
        );
        setSpaceData(response.data);
        console.log("response space data12 >>>>> ", response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSpaceData();
  }, [props.onData?.space?.id]);

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
            <ViewImageOverlay
              scoreHandler={props.onScoreHandler}
              spaceData={spaceData}
            />,
            document.getElementById("overlay-root")
          )}
        </>
      )}
      <header className={classes.spaceTitle}>
        <h2>
          {props.onData?.space?.name}
          <sup className={classes.spaceScore}>0.0/10</sup>
        </h2>
        <div className={classes.spaceTitle_buttons}>
          <button>Update Images</button>
          <button onClick={onViewImageHandler}>View Images</button>
        </div>
      </header>
      <div className={classes.spaceBody}>
        <Card
          className={`${
            props.onData?.scores?.sort >= 8 ? classes.highlight : ""
          }`}
        >
          <div className={classes.scoreTitle}>
            <h3>SORT</h3>
          </div>
          {/* score here */}
          <h3>
            {props.onData?.scores?.sort}/{spaceTotalScore}
          </h3>
        </Card>
        <Card
          className={`${
            props.onData?.scores?.setInOrder >= 8 ? classes.highlight : ""
          }`}
        >
          <div className={classes.scoreTitle}>
            <h3>SET IN ORDER</h3>
          </div>
          {/* score here */}
          <h3>
            {props.onData?.scores?.setInOrder}/{spaceTotalScore}
          </h3>
        </Card>
        <Card
          className={`${
            props.onData?.scores?.shine >= 8 ? classes.highlight : ""
          }`}
        >
          <div className={classes.scoreTitle}>
            <h3>SHINE</h3>
          </div>
          {/* score here */}
          <h3>
            {props.onData?.scores?.shine}/{spaceTotalScore}
          </h3>
        </Card>
        <Card
          className={`${
            props.onData?.scores?.standardize >= 8 ? classes.highlight : ""
          }`}
        >
          <div className={classes.scoreTitle}>
            <h3>STANDARDIZE</h3>
          </div>
          {/* score here */}
          <h3>
            {props.onData?.scores?.standardize}/{spaceTotalScore}
          </h3>
        </Card>
        <Card
          className={`${
            props.onData?.scores?.sustain >= 8 ? classes.highlight : ""
          }`}
        >
          <div className={classes.scoreTitle}>
            <h3>SUSTAIN</h3>
          </div>
          {/* score here */}
          <h3>
            {props.onData?.scores?.sustain}/{spaceTotalScore}
          </h3>
        </Card>
        <Card
          className={`${
            props.onData?.scores?.safety >= 8 ? classes.highlight : ""
          }`}
        >
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
