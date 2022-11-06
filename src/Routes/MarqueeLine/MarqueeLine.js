import styles from "./Marquee.module.css";
import icons from "./icons";
import { useState } from "react";
import Marquee from "./Marquee";

export default function MarqueeLine() {
  const [showIcons, setShowIcons] = useState(() => [
    icons[0],
    icons[1],
    icons[2],
    icons[8],
    icons[4],
  ]);
  return (
    <div className="wrapper">
      <h1 className={styles.title}>Marquee - running items line</h1>
      <h3 className={styles.pickerTitle}>Select icons</h3>
      <ul className={styles.itemList}>
        {icons.map((El, idx) => (
          <El
            className={`${styles.icon} ${
              showIcons.includes(El) ? styles.isActive : ""
            }`}
            onClick={(e) => {
              if (e.currentTarget.classList.contains(styles.isActive)) {
                setShowIcons(showIcons.filter((el) => el !== El));
              } else {
                setShowIcons([...showIcons, El]);
              }
              e.currentTarget.classList.toggle(styles.isActive);
            }}
            height="50px"
            key={`icon_${idx}`}
          />
        ))}
      </ul>
      <h3 className={styles.showTitle}>Marquee</h3>
      <Marquee data={showIcons} />
    </div>
  );
}
