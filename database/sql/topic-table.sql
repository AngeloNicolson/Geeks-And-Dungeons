CREATE DATABASE gndforum;

CREATE TABLE topic(
  topic_id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  created_at DATE NOT NULL,
  updated_at DATE,
  author VARCHAR(255) NOT NULL,
  tags VARCHAR(255) ,
  posts VARCHAR(255) NOT NULL
  );