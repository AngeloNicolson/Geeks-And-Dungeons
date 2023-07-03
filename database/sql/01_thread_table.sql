CREATE TABLE thread (
  thread_id SERIAL PRIMARY KEY,
  thread_title VARCHAR(255) NOT NULL,
  thread_text VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP,
  topic_id INTEGER NOT NULL,
  author VARCHAR(255) NOT NULL
);