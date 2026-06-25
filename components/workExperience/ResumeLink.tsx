import { MdPictureAsPdf } from "react-icons/md";
import styles from "./ResumeLink.module.scss";

export default function ResumeLink({ title, url }: { title: string; url: string }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={styles.link}>
      <MdPictureAsPdf className={styles.icon} />
      {title}
    </a>
  );
}
