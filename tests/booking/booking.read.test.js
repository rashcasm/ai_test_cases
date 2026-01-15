import { describe, it, expect } from "vitest";
import { get } from "../helpers.js";

describe("GET /bookings", () => {
  it("returns 401 without authentication", async () => {
    const res = await get("/bookings");

    expect(res.status).toBe(401);
  });

  it("returns 401 with invalid token", async () => {
    const res = await get("/bookings", "invalid-token");

    expect(res.status).toBe(401);
  });
});
