import React, { useCallback } from "react";
import classes from "./ViewImageOverlay.module.css";
import evaluate from "../../rooms/room/evaluate";

const ViewImageOverlay = ({ spaceData, scoreHandler }) => {
  console.log("spaceData", spaceData);

  const onEvaluateHandler = useCallback(async () => {
    const images = spaceData
      .map((space) => "data:image/png;base64," + space.image)
      .join("");
    console.log(images);
    const result = await evaluate(images);
    scoreHandler(result);
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.container_header}>
        <h2>Images</h2>
        <button className={classes.evaluateBtn} onClick={onEvaluateHandler}>
          Evaluate
        </button>
      </div>

      <div className={classes.imageContainer}>
        {spaceData?.map((image) => (
          <img
            className={classes.image}
            src={`data:image/png;base64,${image.image}`}
            alt={image.name}
            key={image.id}
          />
        ))}
      </div>
    </div>
  );
};

export default ViewImageOverlay;
