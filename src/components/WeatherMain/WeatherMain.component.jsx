import React from "react";
import styles from "./WeatherMain.module.scss";
import Image from "next/image";

export default function WeatherMain({ current }) {
  return (
    <div className={styles.weathermain}>
      <div className={styles.box}>
        <div
          className={styles.location}
        >{`${current?.location?.name}, ${current?.location?.country}`}</div>

        <div className={styles.weather}>
          <Image
            loader={(src) => fileUrl}
            src={"https://" + current?.current?.condition.icon.split("//")[1]}
            alt={current?.current?.condition.text}
            layout="fixed"
            width={50}
            height={50}
            unoptimized={true}
          />
          <div
            className={styles.temperature}
          >{`${current?.current?.temp_c}°C`}</div>
        </div>
        <div className={styles.description}>{current?.current?.condition.text}</div>
      </div>
    </div>
  );
}
