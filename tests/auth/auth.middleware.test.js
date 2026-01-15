import { describe, it, expect } from "vitest";
import { post, get, put, del } from "../helpers.js";

describe("AUTH middleware", () => {
  it("rejects missing auth header", async () => {
    const res = await get("/bookings");

    expect(res.status).toBe(401);
  });

  it("rejects invalid token", async () => {
    const res = await get("/bookings", "invalid-token");

    expect(res.status).toBe(401);
  });

  it("POST /bookings requires auth", async () => {
    const res = await post("/bookings", {
      carName: "BMW",
      days: 5,
      rentPerDay: 1000,
    });

    expect(res.status).toBe(401);
  });

  it("GET /bookings requires auth", async () => {
    const res = await get("/bookings");

    expect(res.status).toBe(401);
  });

  it("PUT /bookings/:id requires auth", async () => {
    const res = await put("/bookings/1", { days: 10 });

    expect(res.status).toBe(401);
  });

  it("DELETE /bookings/:id requires auth", async () => {
    const res = await del("/bookings/1");

    expect(res.status).toBe(401);
  });
});
