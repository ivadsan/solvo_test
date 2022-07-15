import React, {useState} from "react";
import {
  AiOutlineUser,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLock,
} from "react-icons/ai";
import { colors } from "@/constants/config";
import { useForm } from "react-hook-form";
import styles from "@/styles/pages/Login.module.scss";

export default function SimpleContainer() {
  const [values, setValues] = useState({
    passwordValue: '',
    showPassword: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (e) => {};

  const handlePasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="container">
      <div className={styles.login}>
        <div className={styles.box}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="formGroup">
              <span className="iconInput">
                <AiOutlineUser color={colors.darkBlue} />
              </span>
              <input
                id="username"
                autoComplete="username"
                className={`inputAnimation ${
                  watch("username") ? "has-content" : ""
                }`}
                type="text"
                {...register("username", {
                  required: { value: true, message: "Required field" },
                  pattern: {
                    value: /^([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3})$/,
                    message: "Invalid email",
                  },
                })}
              />
              <label htmlFor="username">Username</label>
              <span className="inputErrorMessage">
                {errors.username && errors.username.message}
              </span>
            </div>
            <div className="formGroup">
              <span className="iconInput">
                <AiOutlineLock color={colors.darkBlue} />
              </span>
              <input
                id="password"
                autoComplete="current-password"
                type={values.showPassword ? "text" : "password"}
                onChange={handlePasswordChange("password")}
                className={`inputAnimation ${
                  watch("password") ? "has-content" : ""
                }`}
                {...register("password", { required: true })}
              />
              <span
                className="iconPasswordInput"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? (
                  <AiOutlineEye />
                ) : (
                  <AiOutlineEyeInvisible />
                )}
              </span>
              <label htmlFor="password">Password</label>
              {errors.password && (
                <span className="inputErrorMessage">Required field</span>
              )}
            </div>
            <div >
              <button className="btnDefault btnSecondary sizeDefault fullSize">
                Sign in
            </button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
