import { useState, useEffect, useMemo } from "react";
import classes from "../components/dashboard/dashboard.module.css";
import logo from "../static/images/citu_logo.png";

import DashBoardContent from "../components/dashboard/DashBoardContent";
import Manage from "../components/dashboard/Manage";

import axios from "axios";
import BuildingContext from "../context/building-context";

const Dashboard = () => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(true);
  const [buildingData, setBuildingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get("https://localhost:7124/api/buildings")
          .then((response) => {
            console.log(response.body);
            setBuildingData(response.data);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const providerValue = useMemo(
    () => ({
      buildingData,
    }),
    [buildingData]
  );

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
            <h1>CEBU INSTITUTE OF TECHNOLOGY UNIVERSITY</h1>
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
      <main>
        <BuildingContext.Provider value={providerValue}>
          {isDashboardOpen ? <DashBoardContent /> : <Manage />}
        </BuildingContext.Provider>
      </main>
    </>
  );
};

export default Dashboard;
