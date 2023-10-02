import Card from "../Card/Card";
import classes from "./Overlay.module.css";
import Button from "../Button/Button";
import { useState, useMemo } from "react";

const Overlay = (props) => {
  const { status, data, roomId, onUpdate, onConfirm, onDelete, onCreate } =
    props;
  const { buildingId = "", roomNumber = "", roomStatus = "" } = data || {};
  const [image, setImage] = useState(data?.image || null);
  const [newImage, setNewImage] = useState(null);

  const handleImageUpload = useMemo(
    () => (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const base64Image = btoa(
          new Uint8Array(reader.result).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );

        setNewImage(base64Image);
        setImage(base64Image);
      };

      if (file) {
        reader.readAsArrayBuffer(file);
      }
    },
    []
  );

  const onEditHandler = (event) => {
    event.preventDefault();
    const data = {
      buildingId: parseInt(event.target[0].value),
      roomNumber: event.target[1].value,
      roomStatus: event.target[2].value,
      image: image,
    };
    onUpdate(roomId, data);
    onConfirm();
  };

  const onDeleteHandler = () => {
    onDelete(roomNumber);
    onConfirm();
  };

  const onAddHandler = (event) => {
    event.preventDefault();
    console.log("eventtt ::: ", event);
    const data = {
      buildingId: parseInt(event.target[0].value),
      roomNumber: event.target[1].value,
      status: event.target[2].value,
      image: newImage,
    };
    onCreate(data);
    onConfirm();
  };

  if (status === "edit") {
    return (
      <Card className={classes.editOverlay}>
        <form onSubmit={onEditHandler} className={classes.editForm}>
          <label>Building Id</label>
          <input
            className={classes.search}
            type="text"
            id="buildingId"
            defaultValue={buildingId}
          />
          <label>Name</label>
          <input
            className={classes.search}
            type="text"
            id="roomNumber"
            defaultValue={roomNumber}
          />
          <label>Status</label>
          <input
            className={classes.search}
            type="text"
            id="roomStatus"
            defaultValue={roomStatus}
          />
          <label>Room Image</label>
          <img
            id="image"
            className={classes.editPreview}
            defaultValue={image}
            src={`data:image/png;base64,${image}`}
            alt="Room preview"
          />
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleImageUpload}
          />

          <Button type="submit" className={classes.editBtn}>
            Update Room
          </Button>
        </form>
      </Card>
    );
  }

  if (status === "delete") {
    return (
      <Card className={classes.deleteOverlay}>
        <h1>Are you sure?</h1>
        <Button onClick={onDeleteHandler}>Confirm</Button>
      </Card>
    );
  }

  if (status === "create") {
    return (
      <Card className={classes.editOverlay}>
        <form onSubmit={onAddHandler} className={classes.editForm}>
          <label>Building Id</label>
          <input className={classes.search} type="text" id="buildingId" />
          <label>Name</label>
          <input className={classes.search} type="text" id="roomNumber" />
          <label>Status</label>
          <input className={classes.search} type="text" id="roomStatus" />
          <label>Room Image</label>
          {newImage && (
            <img
              id="image"
              className={classes.editPreview}
              defaultValue={newImage}
              src={`data:image/png;base64,${newImage}`}
              alt="Room preview"
            />
          )}
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleImageUpload}
          />
          <Button type="submit" className={classes.addBtn}>
            Add Room
          </Button>
        </form>
      </Card>
    );
  }
};

export default Overlay;
