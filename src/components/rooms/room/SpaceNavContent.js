import React from "react";
import classes from "./SpaceNavContent.module.css";
import Card from "../../UI/Card/Card";

const SpaceNavContent = (props) => {
  console.log("props {}{}{{}", props);
  return (
    <Card className={classes.spaceNavigation_content}>
      <header className={classes.spaceTitle}>
        <h2>
          {props.onData[0]?.name}{" "}
          <sup className={classes.spaceScore}>0.0/10</sup>
        </h2>
        <div className={classes.spaceTitle_buttons}>
          <button>Update Images</button>
          <button>View Images</button>
        </div>
      </header>
      <div className={classes.spaceBody}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </Card>
  );
};

export default SpaceNavContent;
