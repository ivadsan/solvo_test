import React from "react";
import styles from "./Header.module.scss";
import { AiOutlineLogout } from "react-icons/ai";
import { signOut } from 'next-auth/react';

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.icon}></div>
      <div className={styles.brand}>Weather App</div>
      <div className={styles.icon}>
        <AiOutlineLogout color="white" onClick={()=>signOut()} />
      </div>
    </div>
  );
}
