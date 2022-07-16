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


  useEffect(()=>{
    const notification = async () => {
      if (!('Notification' in window)) {
        return alert('Your browser dot not support notifcations');
      }
  
      if (Notification.permission === 'default') {
        await Notification.requestPermission();
      }
  
      if (Notification.permission === 'blocked') {
        return 'You blocked notifications';
      }
  
      if (Notification.permission === 'granted') {
        return;
      }
    };

   notification()
  },[])

  return (
    <div className="container">
      <Header />
      <div className={styles.dashboard}>
        <SearchLocation setCurrent={setCurrent} setForecast={setForecast} />
        {!!current && <WeatherMain current={current} />}
        {!!forecast && (
          <>
            <Forecast forecast={forecast} />
            <FavoriteButton current={current}/>
          </>
        )}
      </div>
    </div>
  );
}

Dashboard.auth = true;
export default Dashboard;
