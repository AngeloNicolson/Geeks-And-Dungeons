import styles from "./ThreadList.module.css";
import { formatDate } from "../../Utils/formatDate";

const ThreadFeed = ({ threads }) => {
  return (
    <ul>
      {threads.map((thread) => (
        <li key={thread.thread_id} className={styles.threadGrid}>
          <h3 className={styles.threadTitle}>{thread.thread_title}</h3>
          <p>{thread.thread_text}</p>
          <p>{formatDate(thread.created_at)}</p>
        </li>
      ))}
    </ul>
  );
};
export default ThreadFeed;
