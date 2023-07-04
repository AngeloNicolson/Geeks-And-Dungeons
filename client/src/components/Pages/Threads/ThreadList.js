import styles from "./ThreadList.module.css";
import { Link } from "react-router-dom";
import { formatDate } from "../../../Utils/formatDate";

const ThreadFeed = ({ threads }) => {
  return (
    <div className={styles.threadCard}>
      {threads.map((thread) => (
        <Link
          to={`/thread/${thread.thread_id}`}
          key={thread.thread_id}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div key={thread.thread_id} className={styles.threadItem}>
            <div className={styles.threadContent}>
              <h3 className={styles.threadTitle}>{thread.thread_title}</h3>
              <div className={styles.bar}>
                <p className={styles.author}>
                  Posted by: {thread.author}{" "}
                  <span className={styles.date}>
                    {formatDate(thread.created_at)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ThreadFeed;
