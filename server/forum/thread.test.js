const request = require("supertest");
const express = require("express");
const app = require("../app");
const get_pool = require("../db");

// MOCK DATA
const topic_data = require("../MockData/topicMockData");

const repository = require("./getThreads.repository");

describe("GIVEN that the /api/get-threads route exists", () => {
  // This will shutdown the pool call after every test to ensure there are no memory leaks with open pool querries
  // DOC'S https://node-postgres.com/features/pooling
  afterAll(async () => {
    const database = await get_pool();
    database.end();
  });

  test("WHEN there are threads in the database then return status 200 and an array of threads", async () => {
    const getThreads = await repository.getThreads();
    const expectedResStatus = 200;
    const mockedResponsData = topic_data;
    const response = await request(app)
      .get("/api/get-threads")
      .set("Accept", "application/json");
    expect(response.status).toBe(expectedResStatus);
    expect(getThreads).toEqual(mockedResponsData);
  });
});
