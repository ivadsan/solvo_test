import React, { useEffect, useState, useCallback } from "react";
import styles from "./FavoriteButton.module.scss";

export default function FavoriteButton({ current }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("favorites")) {
      localStorage.setItem("favorites", JSON.stringify([]));
    }

    const rta = validate();
    setIsFavorite(rta);
  }, [current, validate]);

  const handleClick = () => {
    const {
      location: { name },
    } = current;

    if (isFavorite) {
      const favoritesBD = JSON.parse(localStorage.getItem("favorites"));
      const newArr = favoritesBD.filter((item) => item !== name);
      localStorage.setItem("favorites", JSON.stringify(newArr));
      setIsFavorite(false);
    } else {
      const favoritesBD = JSON.parse(localStorage.getItem("favorites"));
      favoritesBD.push(name);
      localStorage.setItem("favorites", JSON.stringify(favoritesBD));
      setIsFavorite(true);
    }
  };

  const validate = useCallback(() => {
    const {
      location: { name },
    } = current;

    const favoritesBD = JSON.parse(localStorage.getItem("favorites"));

    let rta = false;

    favoritesBD.forEach((favorite) => {
      if (favorite === name) {
        rta = true;
      }
    });

    return rta;
  }, [current]);

  return (
    <div className={styles.favoritebutton}>
      <button
        className="btnDefault btnSecondary sizeDefault fullSize"
        onClick={handleClick}
      >
        {isFavorite ? "Added" : "Add"}
      </button>
    </div>
  );
}
