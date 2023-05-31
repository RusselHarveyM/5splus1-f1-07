import Card from "../Card/Card";
import classes from "./Overlay.module.css";
import Button from "../Button/Button";

const Overlay = (props) => {
  if (props.status === "edit") {
    return <Card className={classes.editOverlay}></Card>;
  }
  if (props.status === "delete") {
    const onDeleteHandler = () => {
      props.onDelete(props.userId);
      props.onConfirm();
    };
    return (
      <Card className={classes.deleteOverlay}>
        <h1>Are you sure?</h1>
        <Button onClick={onDeleteHandler}>Confirm</Button>
      </Card>
    );
  }
};

export default Overlay;
