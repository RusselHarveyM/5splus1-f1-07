import React, { useState, useEffect } from "react";
import classes from "./SpaceNavContent.module.css";
import Card from "../../UI/Card/Card";
import axios from "axios";
import { useParams } from "react-router-dom";
// import evaluate from "./evaluate";


const SpaceNavContent = (props) => {
  const [spaceTotalScore, setSpaceTotalScore] = useState(10);
  const params = useParams();
  const [spaceData, setSpaceData] = useState();
  useEffect(() => {
    const fetchSpaceData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7124/api/spaceimage/get/${params.spaceId}`
        );
        setSpaceData(response.data);
        console.log("response space data >>>>> ", response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSpaceData();
  }, [params.spaceId]);
  // console.log("Imagecode >>>", spaceData[0].image)

  // console.log(evaluate("data:image/png;base64,"+spaceData[0].image))
  console.log("props {}{}{{}", props);
  return (
    <Card className={classes.spaceNavigation_content}>
      <header className={classes.spaceTitle}>
        <h2>
          {props.onData[0]?.name}
          <sup className={classes.spaceScore}>0.0/10</sup>
        </h2>
        <div className={classes.spaceTitle_buttons}>
          <button>Update Images</button>
          <button>View Images</button>
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