import React from "react";
import classes from "./ViewImageOverlay.module.css";

const ViewImageOverlay = ({ spaceData }) => {
  console.log("spaceData", spaceData);
  return (
    <div className={classes.container}>
      <h2>Images</h2>
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
