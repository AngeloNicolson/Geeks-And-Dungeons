CREATE TABLE thread (
  thread_id SERIAL PRIMARY KEY,
  thread_title VARCHAR(77) NOT NULL,
  thread_text VARCHAR(1777) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP,
  topic_id INTEGER NOT NULL,
  author INTEGER NOT NULL,
  FOREIGN KEY (author) REFERENCES users (id)
);