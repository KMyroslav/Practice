import { useState } from "react";
import Input from "./InputToAsterisk.component";
import styles from "./InputToAsterisk.module.css";

export default function InputToAsterisk() {
  const [value, setValue] = useState("");
  const [delay, setDelay] = useState(250);
  return (
    <div className={styles.wrapper}>
      <h1>Input chars transforming to asterisks after a delay</h1>
      <Input setInputValue={setValue} delay={delay}></Input>
      <h2 className={styles.value}>{`${value}`}</h2>
      <label className={styles.delayLabel} htmlFor="delayInput">
        Change Delay:
        <input
          className={styles.delayInput}
          id="delayInput"
          type="number"
          value={delay}
          onChange={(e) => {
            const target = e.currentTarget;
            const targetValue = Math.max(25, Math.min(10000, +e.target.value));
            setDelay(targetValue);
            target.style.width = (target.value.length + 1) * 8 + 20 + "px";
          }}
        />
        ms.
      </label>
    </div>
  );
}
