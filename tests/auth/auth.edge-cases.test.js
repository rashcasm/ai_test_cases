import { describe, it, expect } from "vitest";
import { post, generateUsername } from "../helpers.js";

describe("AUTH edge cases", () => {
  it("accepts username with numbers", async () => {
    const username = generateUsername() + "123";
    const res = await post("/auth/signup", {
      username,
      password: "password123",
    });

    expect(res.status).toBe(201);
    expect(res.data.success).toBe(true);
  });

  it("rejects null username", async () => {
    const res = await post("/auth/signup", {
      username: null,
      password: "password123",
    });

    expect(res.status).toBe(400);
    expect(res.data.success).toBe(false);
  });

  it("rejects empty string username", async () => {
    const res = await post("/auth/signup", {
      username: "",
      password: "password123",
    });

    expect(res.status).toBe(400);
  });

  it("password not returned in response", async () => {
    const username = generateUsername();
    const password = "SecurePassword123!";

    const res = await post("/auth/signup", {
      username,
      password,
    });

    expect(JSON.stringify(res.data)).not.toContain(password);
  });

  it("different users get different tokens", async () => {
    const password = "samePassword123";
    const username1 = generateUsername();
    const username2 = generateUsername();

    await post("/auth/signup", {
      username: username1,
      password,
    });

    await post("/auth/signup", {
      username: username2,
      password,
    });

    const token1 = await post("/auth/login", {
      username: username1,
      password,
    });

    const token2 = await post("/auth/login", {
      username: username2,
      password,
    });

    expect(token1.data.data.token).not.toBe(token2.data.data.token);
  });
});
