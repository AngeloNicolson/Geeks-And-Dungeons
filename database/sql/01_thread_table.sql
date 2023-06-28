CREATE TABLE thread(
  thread_id SERIAL PRIMARY KEY,
  thread_title VARCHAR(255) NOT NULL,
  thread_text VARCHAR(1200) NOT NULL,
  created_at DATE NOT NULL,
  updated_at DATE,
  topic_id integer NOT NULL,
  author VARCHAR(255) NOT NULL
);