import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const Rooms = () => {
  const params = useParams();

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

  return (
    <>
      <div>Rooms</div>
    </>
  );
};

export default Rooms;
