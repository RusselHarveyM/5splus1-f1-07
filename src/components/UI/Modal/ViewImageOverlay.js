import React, { useCallback, useState } from "react";
import classes from "./ViewImageOverlay.module.css";
import evaluate from "../../rooms/room/evaluate";

const ViewImageOverlay = ({ spaceData, scoreHandler }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState(spaceData);

  const onEvaluateHandler = useCallback(async () => {
    const images = data
      .map((space) => "data:image/png;base64," + space.image)
      .join("");
    const result = await evaluate(images);
    scoreHandler(result);
  }, []);

  const onEditHandler = () => {
    setIsEdit(!isEdit);
    if (isEdit) {
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.container_header}>
        <h2>Images</h2>
      </div>

      <div className={classes.imageContainer}>
        {data?.map((image) => (
          <div>
            <img
              className={classes.image}
              src={`data:image/png;base64,${image.image}`}
              alt={image.name}
              key={image.id}
            />
            {isEdit ? (
              <button className={classes.deleteImageBtn}>X</button>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
      <div className={classes.buttonsContainer}>
        <button className={classes.evaluateBtn} onClick={onEvaluateHandler}>
          Evaluate
        </button>
        {isEdit ? (
          <div className={classes.editBtnContainer}>
            <button
              className={classes.cancelBtn}
              onClick={() => setIsEdit(!isEdit)}
            >
              Cancel
            </button>
            <button className={classes.confirmBtn} onClick={onEditHandler}>
              Confirm
            </button>
          </div>
        ) : (
          <button className={classes.editBtn} onClick={onEditHandler}>
            Edit Images
          </button>
        )}
      </div>
    </div>
  );
};

export default ViewImageOverlay;
