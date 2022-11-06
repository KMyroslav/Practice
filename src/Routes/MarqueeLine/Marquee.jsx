import styles from "./Marquee.module.css";
export default function Marquee({
  data,
}) {
  return (
    <div className={styles.marqueeWrapper}>
      <ul className={styles.marqueeItemList}>
        {[
          ...data,
        ].map((El, idx) => (
          <li className={styles.marqueeItem} key={`marqueeItem_${idx}>`}>
            <El height="50px" width="100%" />
          </li>
        ))}
      </ul>
    </div>
  );
}
