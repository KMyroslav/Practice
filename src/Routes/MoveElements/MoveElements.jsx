import styles from "./MoveElements.module.css";
import numToWord from "../../Utils/numToWord";
import { useState } from "react";

export default function MoveElements() {
  const [items, setitems] = useState([
    "0 title zero",
    "1 title one",
    "2 title two",
  ]);

  return (
    <>
      <button
        type="button"
        className={styles.btn}
        onClick={() => {
          setitems([
            ...items,
            `${items.length} title ${numToWord(items.length)} `,
          ]);
        }}
      >
        Add
      </button>
      <div
        className={styles.wrapper}
        onPointerDown={(e) => {
          if (e.target.nodeName !== "LI") return;
          e.target.setPointerCapture(e.pointerId);
          e.target.onpointermove = (e) => {
            const target = e.target;
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const elWidthCenter = target.clientWidth / 2;
            const elHeightCenter = target.clientHeight / 2;
            const targetX = target.offsetLeft;
            const targetY = target.offsetTop;
            const windowOffsetX = e.view.pageXOffset;
            const windowOffsetY = e.view.pageYOffset;
            const moveX = windowOffsetX + mouseX - targetX - elWidthCenter;
            const moveY = windowOffsetY + mouseY - targetY - elHeightCenter;

            console.log(e);

            target.style.cursor = "grabbing";
            target.style.opacity = "0.8";
            target.style.transition = `opacity 250ms ease-in-out`;

            target.style.transform = `translate(${moveX}px, ${moveY}px)`;
          };
        }}
        onPointerUp={(e) => {
          if (e.target.nodeName !== "LI") return;
          const target = e.target;

          target.releasePointerCapture(e.pointerId);
          target.onpointermove = null;

          target.style.cursor = "grab";
          target.style.opacity = "1";
        }}
      >
        <ul className={styles.list}>
          {items.map((el, i) => (
            <li key={i} className={styles.listItem}>
              {el}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
