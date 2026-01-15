import { describe, it, expect } from "vitest";
import { post, generateUsername } from "../helpers.js";

describe("AUTH /signup", () => {
  it("creates a new user successfully", async () => {
    const username = generateUsername();
    const password = "password123";

    const res = await post("/auth/signup", {
      username,
      password,
    });

    expect(res.status).toBe(201);
    expect(res.data.success).toBe(true);
    expect(res.data.data.userId).toBeDefined();
  });

  it("rejects duplicate usernames", async () => {
    const username = generateUsername();
    const password = "password123";

    await post("/auth/signup", { username, password });
    const res = await post("/auth/signup", { username, password });

    expect(res.status).toBe(409);
    expect(res.data.success).toBe(false);
  });

  it("fails when password is missing", async () => {
    const res = await post("/auth/signup", {
      username: generateUsername(),
    });

    expect(res.status).toBe(400);
    expect(res.data.success).toBe(false);
  });

  it("fails when username is missing", async () => {
    const res = await post("/auth/signup", {
      password: "password123",
    });

    expect(res.status).toBe(400);
    expect(res.data.success).toBe(false);
  });

  it("does not return password in response", async () => {
    const username = generateUsername();
    const password = "password123";

    const res = await post("/auth/signup", { username, password });

    expect(res.data.data.password).toBeUndefined();
  });
});
