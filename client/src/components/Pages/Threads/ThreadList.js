import styles from "./ThreadList.module.css";
import { formatDate } from "../../../Utils/formatDate";

const ThreadFeed = ({ threads }) => {
  return (
    <div className={styles.threadCard}>
      {threads.map((thread) => (
        <div key={thread.thread_id} className={styles.threadItem}>
          <div className={styles.threadContent}>
            <h3 className={styles.threadTitle}>{thread.thread_title}</h3>
            <p className={styles.date}>{formatDate(thread.created_at)}</p>
            <div className={styles.bar}>Placeholder option bar</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ThreadFeed;
