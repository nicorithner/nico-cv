import { ReactNode } from "react";
import styles from "./MarqueeTile.module.scss";

type MarqueeTileProps = {
  name: string;
  icon: ReactNode;
};

export default function MarqueeTile({ name, icon }: MarqueeTileProps) {
  return (
    <div className={styles.tile} title={name}>
      {icon}
    </div>
  );
}
