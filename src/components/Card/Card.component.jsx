import React from "react";
import Image from "next/image";
import styles from "./Card.module.scss"

export default function Card({data}) {
  return (
    <div className={styles.card}>
      <div className={styles.hour}>{data?.time.split(' ')[1]}</div>
      <div className={styles.icon}>
        <Image
          loader={(src) => fileUrl}
          src={"https://" + data?.condition.icon.split("//")[1]}
          alt={data?.condition.text}
          layout="fixed"
          width={50}
          height={50}
          unoptimized={true}
        />
      </div>
      <div className={styles.temp}>{`${data?.temp_c}°C`}</div>
    </div>
  );
}
