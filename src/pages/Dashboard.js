import React from "react";
import classes from "../components/dashboard/dashboard.module.css";
import logo from "../static/images/citu_logo.png";

const Dashboard = () => {
  return (
    <div>
      <header className={classes.dashboardHeader}>
        <div className={classes.intro}>
          <img src={logo} alt="logo" className={classes.logo} />
          <div className={classes.introText}>
            <h2>WELCOME BACK</h2>
            <h1>CEBU INSTITUTE OF TECHNOLOGY</h1>
          </div>
        </div>
        <nav>
          <ul className={classes.dashboardNav}>
            <li>Dashboard</li>
            <li>Users</li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Dashboard;
