import styles from "./StatTile.module.scss";

type StatTileProps = {
  value: number | string;
  label: string;
};

export default function StatTile({ value, label }: StatTileProps) {
  return (
    <div className={styles.statTile} data-testid="stat-tile">
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
}
