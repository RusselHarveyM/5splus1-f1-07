import { useState } from "react";
import classes from "../components/dashboard/dashboard.module.css";
import logo from "../static/images/citu_logo.png";

import DashBoardContent from "../components/dashboard/DashBoardContent";
import Manage from "../components/dashboard/Manage";

const Dashboard = () => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(true);

  const toggleDashboard = () => {
    setIsDashboardOpen(!isDashboardOpen);
  };

  return (
    <>
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
            <li>
              <button
                onClick={toggleDashboard}
                className={`${isDashboardOpen ? classes.active : ""}`}
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={toggleDashboard}
                className={`${!isDashboardOpen ? classes.active : ""}`}
              >
                Manage
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <main>{isDashboardOpen ? <DashBoardContent /> : <Manage />}</main>
    </>
  );
};

export default Dashboard;
