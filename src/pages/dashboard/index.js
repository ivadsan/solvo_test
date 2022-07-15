import React, { useState } from "react";
import styles from "@/styles/pages/Dashboard.module.scss";
import WeatherMain from "@/components/WeatherMain/WeatherMain.component";
import SearchLocation from "@/components/SearchLocation/SearchLocation.component";
import Forecast from "@/components/Forecast/Forecast.component";

export default function Dashboard() {
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState(null);

  return (
    <div className="container">
      <div className={styles.dashboard}>
        <SearchLocation setCurrent={setCurrent} setForecast={setForecast}/>
        {!!current && <WeatherMain current={current}/>}
        {!!forecast && <Forecast forecast={forecast}/>}
      </div>
    </div>
  );
}
