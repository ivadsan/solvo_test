import React, { useEffect, useState } from "react";
import styles from "./SearchLocation.module.scss";
import { searchLocations, getCurrentWeather } from "@/services/WeatherService";
import { useForm } from "react-hook-form";
import { AiOutlineSearch } from "react-icons/ai";

export default function SearchLocation({setCurrent, setForecast}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    handleSearch();
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    setError,
  } = useForm();

  const handleSearch = async (keyword) => {
    const res = await searchLocations(keyword);

    if (res.status === 200) {
      const { data } = res;

      const rta = data.map((item) => ({
        value: item.url,
        label: `${item.name} | ${item.region} | ${item.country} `,
      }));
      setData(rta);
    }
  };

  const onSubmit = async (e) => {
    const { location } = e;

    if (location.length < 3) {
      setError("location", {
        type: "custom",
        message: "Insert at least three characters",
      });
      return false;
    }

    handleSearch(location);
  };

  const handleSelectedLocation = async (keyword) => {
    const res = await getCurrentWeather(keyword);

    if (res.status === 200) {
      const { data } = res;

      const {forecast: {forecastday}} =  data
      const {hour} = forecastday[0]

      setCurrent(data);
      setForecast(hour)
      setData([])

    }
  };

  return (
    <div className={styles.search}>
      <div className={styles.box}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={`formGroup ${styles.formGroup}`}>
            <input
              id="location"
              type={"text"}
              className={`inputAnimation ${
                watch("location") ? "has-content" : ""
              } ${styles.input}`}
              {...register("location", {
                required: { value: true, message: "Required field" },
              })}
            />
            <span className={`iconPasswordInput ${styles.iconSearch}`}>
              <button className="btnDefault btnSecondary" type="submit">
                <AiOutlineSearch color="white" />
              </button>
            </span>
            <label htmlFor={`location`} className={styles.label}>
              Location
            </label>
            {errors.location && (
              <span className="inputErrorMessage">
                {errors.location.message}
              </span>
            )}
          </div>
        </form>
        {data.length > 0 && (
          <div className={styles.list} onMouseLeave={() => setData([])}>
            <div className={styles.options}>
              {data.map((option, index) => (
                <div
                  key={"option" + index}
                  className={styles.option}
                  onClick={() => handleSelectedLocation(option.value)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
