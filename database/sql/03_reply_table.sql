CREATE TABLE reply (
  reply_id SERIAL PRIMARY KEY,
  reply_text VARCHAR(1777) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP,
  thread_id INTEGER NOT NULL,
  author VARCHAR(37) NOT NULL,
  FOREIGN KEY (thread_id) REFERENCES thread(thread_id)
);