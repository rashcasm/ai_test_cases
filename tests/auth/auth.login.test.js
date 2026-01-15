import { describe, it, expect } from "vitest";
import { post, generateUsername } from "../helpers.js";

describe("AUTH /login", () => {
  it("rejects with 401 for incorrect password", async () => {
    const username = generateUsername();

    await post("/auth/signup", {
      username,
      password: "correct",
    });

    const res = await post("/auth/login", {
      username,
      password: "wrong",
    });

    expect(res.status).toBe(401);
    expect(res.data.success).toBe(false);
  });

  it("rejects with 401 for non-existent user", async () => {
    const res = await post("/auth/login", {
      username: "ghost_user",
      password: "password123",
    });

    expect(res.status).toBe(401);
    expect(res.data.success).toBe(false);
  });

  it("fails with 400 when password is missing", async () => {
    const res = await post("/auth/login", {
      username: "someone",
    });

    expect(res.status).toBe(400);
    expect(res.data.success).toBe(false);
  });

  it("fails with 400 when username is missing", async () => {
    const res = await post("/auth/login", {
      password: "password123",
    });

    expect(res.status).toBe(400);
    expect(res.data.success).toBe(false);
  });
});
