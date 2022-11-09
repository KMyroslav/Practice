import { useEffect } from "react";
import { useState } from "react";
import styles from "./InputToAsterisk.module.css";

let timeoutId;
const clearTimeout = () => {
  window.clearTimeout(timeoutId);
  timeoutId -= 1;
};

export default function InputToAsterisk({ setInputValue, delay }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    setInputValue(value);
  }, [setInputValue, value]);

  function changeToAsterisk(e, value) {
    const target = e.target;
    timeoutId = setTimeout(() => {
      target.value =
        value.replace(/./g, "•") + target.value.slice(value.length);
    }, delay);
  }

  function handleChange(e) {
    console.log("timeoutId: ", timeoutId);
    const currentValue = e.target.value;

    function setCheckedValue(value) {
      if (value.indexOf("•") !== -1) {
        setValue(value.slice(0, value.indexOf("•")));
        e.target.value = currentValue.slice(0, value.indexOf("•"));
        return;
      } else {
        setValue(value);
      }
    }

    if (
      currentValue.length === value.length &&
      currentValue[currentValue.length - 1] !== "•" &&
      currentValue[currentValue.length - 1] !== value[currentValue.length - 1]
    ) {
      console.log("input same as value and last char is not asterisk");
      setCheckedValue(
        value.slice(0, value.length - 1) + currentValue.slice(value.length - 1)
      );
      return;
    }

    if (currentValue.length < value.length) {
      if (
        currentValue.length &&
        currentValue[currentValue.length - 1] !== "•" &&
        currentValue[currentValue.length - 1] !== value[currentValue.length - 1]
      ) {
        console.log("input is shorter and last char not asterisk");
        setCheckedValue(
          value.slice(0, currentValue.length - 1) + currentValue.slice(-1)
        );
        return;
      }

      console.log("input shorter than value");
      setCheckedValue(value.slice(0, currentValue.length));
      clearTimeout();
      return;
    }

    console.log("default // input bigger than value");
    setCheckedValue(value + currentValue.slice(value.length));
    changeToAsterisk(e, currentValue);
  }

  return (
    <input
      type="input"
      className={styles.input}
      onChange={handleChange}
      onPaste={(e) => {
        e.preventDefault();
      }}
    ></input>
  );
}
