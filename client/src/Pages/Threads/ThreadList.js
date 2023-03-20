import styles from "./ThreadList.module.css";

const ThreadList = ({ threads }) => {
  return (
    <ul>
      {threads.map((thread) => (
        <li key={thread.thread_id}>
          <h3 className={styles.threadTitle}>{thread.thread_title}</h3>
        </li>
      ))}
    </ul>
  );
};
export default ThreadList;
