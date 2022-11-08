import { useEffect } from "react";
import { useState } from "react";
import styles from "./InputToAsterisk.module.css";

export default function InputToAsterisk() {
  const [value, setValue] = useState("");
  const [valueLength, setValueLength] = useState(0);
  const [currentLength, setCurrentLength] = useState(0);

  useEffect(() => {
    setValueLength(value.length);
  }, [value]);

  let timeoutId;
  const clearTimeout = () => {
    window.clearTimeout(timeoutId);
    timeoutId -= 1;
  };

  function changeToAsterisk(e, value) {
    const target = e.target;
    timeoutId = setTimeout(() => {
      target.value =
        value.replace(/./g, "•") + target.value.slice(value.length);
    }, 1000);
  }

  function handleChange(e) {
    console.log("timeoutId: ", timeoutId);
    const currentValue = e.target.value;

    function setCheckedValue(value) {
      if (value.indexOf("•") !== -1) {
        setValue(value.slice(0, value.indexOf("•")));
        e.target.value = currentValue.slice(0, value.indexOf("•"));
        setCurrentLength(currentValue.length);
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
      setCurrentLength(currentValue.length);
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
        setCurrentLength(currentValue.length);
        return;
      }

      console.log("input shorter than value");
      setCheckedValue(value.slice(0, currentValue.length));
      clearTimeout();
      setCurrentLength(currentValue.length);
      return;
    }

    console.log("default // input bigger than value");
    setCheckedValue(value + currentValue.slice(value.length));
    changeToAsterisk(e, currentValue);
    setCurrentLength(currentValue.length);
  }

  return (
    <div className={styles.wrapper}>
      <h1>Input chars transforming to asterisks after a delay</h1>
      <input
        type="input"
        className={styles.input}
        onChange={handleChange}
        onPaste={(e) => {
          e.preventDefault();
        }}
      ></input>
      <span>{currentLength}</span>
      <h2 className={styles.value}>{`${value}`}</h2>
      <span>{valueLength}</span>
    </div>
  );
}

/*
if in 350ms adds char and deletes 1 =>
1. currentValue = c =>  
2.
3.
*/
