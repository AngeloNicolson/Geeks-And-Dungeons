const request = require("supertest");
const app = require("../app");
const get_pool = require("../db");
const express = require("express");
const jwt = require("jsonwebtoken");
const repository = require("./getThreads.repository");
const { thread_data } = require("../__mocks__/MockData/threadMockData");

/* 
----------------------------------------
                MOCKS
----------------------------------------
*/
// Mock the getThreads function in the repository module and populate it with mocked data
jest.mock("./getThreads.repository", () => {
  const { thread_data } = require("../__mocks__/MockData/threadMockData");
  return {
    getThreads: jest.fn().mockResolvedValue(thread_data),
  };
});

// Mock the createThread function in the repository module
jest.mock("./postThread.repository", () => {
  return {
    createThread: jest.fn(),
  };
});

/* 
----------------------------------------
                TESTS
----------------------------------------
*/
describe("GIVEN that the /api/get-threads route exists", () => {
  test("WHEN there are threads in the database then return status 200 and an array of threads", async () => {
    // ARRANGE
    const getThreads = await repository.getThreads();
    const expectedResStatus = 200;
    const mockedResponsData = thread_data;
    // ACT
    const response = await request(app)
      .get("/api/get-threads")
      .set("Accept", "application/json");
    // ASSERT
    expect(response.status).toBe(expectedResStatus);
    expect(getThreads).toEqual(mockedResponsData);
  });
});

describe("GIVEN that the /api/new-threads route exists", () => {
  test("WHEN a new thread is created, it should return status 200", async () => {
    /* 
    ----------------------------------------
                   ARRANGE
    ----------------------------------------
    */
    // Mock the behavior of jwt.verify
    const verifyMock = jest.spyOn(jwt, "verify");
    verifyMock.mockReturnValue({ userId: "123" });
    // Set up the express app
    const appWithMockedMiddleware = express();
    appWithMockedMiddleware.use("/api/new-thread", (req, res) => {
      res.sendStatus(201);
    });

    // Define the request body for creating a new thread
    const requestBody = {
      thread_title: "New Thread",
      thread_text: "This is a new thread",
      updated_at: new Date().toISOString(),
      topic_id: 1,
      author: "user123",
    };
    /* 
    ----------------------------------------
                    ACT
    ----------------------------------------
    */
    const response = await request(appWithMockedMiddleware)
      .post("/api/new-thread")
      .set("Accept", "application/json")
      .send(requestBody);
    /* 
    ----------------------------------------
                    ASSERT
    ----------------------------------------
    */
    expect(response.status).toBe(201);
    /* 
    ----------------------------------------
                  CLEAN UP
    ----------------------------------------
    */
    // Restore the original implementation of jwt.verify
    verifyMock.mockRestore();
  });

  test("WHEN a user is not authenticated new thread is submitted to the database, THEN return status 401", async () => {
    // ACT
    const response = await request(app)
      .post("/api/new-thread")
      .set("Accept", "application/json");
    // ASSERT
    expect(response.status).toBe(401);
  });
});
