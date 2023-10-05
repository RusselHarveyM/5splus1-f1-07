import Card from "../Card/Card";
import classes from "./Overlay.module.css";
import Button from "../Button/Button";
import { useState, useCallback } from "react";

const Overlay = (props) => {
  const {
    status,
    data,
    imageData,
    spaceId,
    onUpdate,
    onAddImage,
    onConfirm,
    onDelete,
    onCreate,
  } = props;
  const { name = "", roomId = "" } = data || {};
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = useCallback((event) => {
    setSelectedFile(event.target.files[0]);
  }, []);

  const onEditHandler = (event) => {
    event.preventDefault();
    const data = {
      name: event.target[0].value,
      roomId: event.target[1].value,
    };
    onUpdate(spaceId, data);
    onConfirm();
  };

  const onDeleteHandler = () => {
    onDelete(spaceId);
    onConfirm();
  };

  const onAddImageHandler = async () => {
    if (!selectedFile) {
      throw new Error("File field is required.");
    }
    onAddImage(spaceId, selectedFile);
    onConfirm();
  };

  const onAddHandler = (event) => {
    event.preventDefault();
    const data = {
      name: event.target[0].value,
      roomId: event.target[1].value,
    };
    onCreate(data);
    onConfirm();
  };

  if (status === "edit") {
    return (
      <Card className={classes.editOverlay}>
        <form onSubmit={onEditHandler} className={classes.editForm}>
          <label>Space Name</label>
          <input
            className={classes.search}
            type="text"
            id="spaceName"
            defaultValue={name}
          />
          <label>Room Id</label>
          <input
            className={classes.search}
            type="text"
            id="roomId"
            defaultValue={roomId}
          />
          <Button type="submit" className={classes.editBtn}>
            Update
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
          <label>Space Name</label>
          <input className={classes.search} type="text" id="spaceName" />
          <label>Room Id</label>
          <input className={classes.search} type="text" id="roomId" />
          <Button type="submit" className={classes.addBtn}>
            Add Space
          </Button>
        </form>
      </Card>
    );
  }
  if (status === "image") {
    return (
      <Card className={classes.editOverlay}>
        <div className={classes.editForm}>
          <label>Space Images</label>
          <div className={classes.spaceImageContainer}>
            {imageData?.data?.map((data) => (
              <img
                id="image"
                src={`data:image/png;base64,${data.image}`}
                alt="space preview"
                className={classes.spaceImage}
              />
            ))}
          </div>

          <input
            type="file"
            name="file"
            id="imageUpload"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
          />

          <Button onClick={onAddImageHandler} className={classes.addBtn}>
            Add Image
          </Button>
        </div>
      </Card>
    );
  }
};

export default Overlay;
