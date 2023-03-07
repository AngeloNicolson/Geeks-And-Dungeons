CREATE TABLE post(
  post_id SERIAL PRIMARY KEY,
  post_text VARCHAR(255) NOT NULL,
  created_at DATE NOT NULL,
  updated_at DATE,
  topic VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL
);