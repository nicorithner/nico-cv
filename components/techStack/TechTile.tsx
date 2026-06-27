import { ReactNode } from "react";
import styles from "./TechTile.module.scss";

type TechTileProps = {
  name: string;
  icon: ReactNode;
};

export default function TechTile({ name, icon }: TechTileProps) {
  return (
    <div className={styles.tile}>
      <span className={styles.hex}>
        <span className={styles.icon}>{icon}</span>
      </span>
      <p className={styles.label}>{name}</p>
    </div>
  );
}
