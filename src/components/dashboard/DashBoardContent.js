import classes from "./DashBoardContent.module.css";
import Card from "../UI/Card/Card";

const DashBoardContent = () => {
  return (
    <section className={classes.dashboardCards}>
      <Card className={classes.item1}>
        <h1>357</h1>
        <h2>Rooms</h2>
      </Card>
      <Card className={classes.item2} />
      <Card className={classes.item3} />
      <Card className={classes.item4} />
    </section>
  );
};

export default DashBoardContent;
