import { describe, it, expect } from "vitest";
import { post, get, createUserAndGetToken } from "../helpers.js";

describe("AUTH security", () => {
  it("does not leak internal error details", async () => {
    const res = await post("/auth/signup", null);

    expect(JSON.stringify(res.data)).not.toMatch(/prisma|bcrypt|stack/i);
  });

  it("JWT token only returned on successful login", async () => {
    const res = await post("/auth/login", {
      username: "random",
      password: "random",
    });

    expect(res.data?.data?.token).toBeUndefined();
  });

  it("accepts valid JWT token in Authorization header", async () => {
    const { token } = await createUserAndGetToken();

    const res = await get("/bookings", token);

    expect(res.status).not.toBe(401);
  });

  it("attaches user info after valid token", async () => {
    const { token } = await createUserAndGetToken();

    const res = await post("/bookings", {
      carName: "Honda City",
      days: 2,
      rentPerDay: 1000,
    }, token);

    expect(res.status).toBe(201);
    expect(res.data.success).toBe(true);
  });

  it("rejects requests without authorization header", async () => {
    const res = await get("/bookings");

    expect(res.status).toBe(401);
  });

  it("rejects invalid token", async () => {
    const res = await get("/bookings", "invalid.token.here");

    expect(res.status).toBe(401);
  });
});
