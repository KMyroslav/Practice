import { useEffect } from "react";
import styles from "./Marquee.module.css";

export default function Marquee({
  data,
  displayNum = 4,
  width = "80%",
  height = "70px",
}) {
  useEffect(() => {
    const root = document.documentElement.style;

    root.setProperty("--marquee-elements", data.length);
    root.setProperty("--marquee-width", width);
    root.setProperty("--marquee-height", height);
    root.setProperty("--marquee-element-displayed", displayNum);

    data.length < displayNum
      ? root.setProperty("--marquee-element-displayed", data.length)
      : root.setProperty("--marquee-element-displayed", displayNum);
  }, [data.length, displayNum, height, width]);

  return (
    <div className={styles.marqueeWrapper}>
      <ul className={styles.marqueeItemList}>
        {[
          ...data,
          ...data.slice(0, data.length < displayNum ? data.length : displayNum),
        ].map((El, idx) => (
          <li className={styles.marqueeItem} key={`marqueeItem_${idx}>`}>
            <El height="50px" width="100%" />
          </li>
        ))}
      </ul>
    </div>
  );
}
