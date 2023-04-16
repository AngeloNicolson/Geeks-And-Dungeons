import styles from "./ThreadList.module.css";
import { formatDate } from "../../Utils/formatDate";

import EyeButton from "../../components/Buttons/EyeButton/EyeButton";
const ThreadFeed = ({ threads }) => {
  return (
    <>
      <ul className={styles.threadCard}>
        {threads.map((thread) => (
          <div key={thread.thread_id} className={styles.card_layout}>
            <div className={styles.button_container}>
              <div className={styles.thread_button}>
                <EyeButton onMouseMove={(event) => this.handleMouse(event)} />
              </div>
            </div>
            <p className={styles.button_title}>
              A mysterious being becons you to enter
            </p>
            <li className={styles.threadGrid}>
              <h3 className={styles.threadTitle}>{thread.thread_title}</h3>
              <p>{thread.thread_text}</p>
              <p>{formatDate(thread.created_at)}</p>
            </li>
          </div>
        ))}
      </ul>
    </>
  );
};
export default ThreadFeed;

/*
---------------------------
        CREDITS
---------------------------
*/
// https://codepen.io/Fieve/pen/bogzQW
// https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feGaussianBlur
