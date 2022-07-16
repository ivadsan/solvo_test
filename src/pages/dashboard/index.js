import React, { useState, useEffect } from "react";
import styles from "@/styles/pages/Dashboard.module.scss";
import WeatherMain from "@/components/WeatherMain/WeatherMain.component";
import SearchLocation from "@/components/SearchLocation/SearchLocation.component";
import Forecast from "@/components/Forecast/Forecast.component";
import Header from "@/components/Header/Header.component";
import FavoriteButton from "@/components/FavoriteButton/FavoriteButton.component";

function Dashboard() {
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    const notifyMe =  async () => {
      if (!("Notification" in window)) {
        alert("This browser does not support notifications");
      } else if (Notification.permission === "granted") {
        let notification = new Notification("Hola!");
        setTimeout(() => {
          notification.close();
      }, 10 * 1000);
      } else if (
        Notification.permission !== "denied" ||
        Notification.permission === "default"
      ) {
        Notification.requestPermission(function (permission) {
          if (permission === "granted") {
            let notification = new Notification("Hola!");
            setTimeout(() => {
              notification.close();
          }, 10 * 1000);
          }
        });
      }
    }

    notifyMe();
  }, []);

  return (
    <div className="container">
      <Header />
      <div className={styles.dashboard}>
        <SearchLocation setCurrent={setCurrent} setForecast={setForecast} />
        {!!current && <WeatherMain current={current} />}
        {!!forecast && (
          <>
            <Forecast forecast={forecast} />
            <FavoriteButton current={current} />
          </>
        )}
      </div>
    </div>
  );
}

Dashboard.auth = true;
export default Dashboard;
