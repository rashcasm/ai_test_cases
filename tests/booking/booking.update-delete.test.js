import { describe, it, expect } from "vitest";
import { put, del } from "../helpers.js";

describe("PUT /bookings/:id", () => {
  it("requires authentication", async () => {
    const res = await put(`/bookings/1`, { days: 10 });

    expect(res.status).toBe(401);
  });

  it("returns error for invalid token", async () => {
    const res = await put(`/bookings/999999`, { days: 10 }, "fake-token");

    expect(res.status).toBe(401);
  });
});

describe("DELETE /bookings/:id", () => {
  it("requires authentication", async () => {
    const res = await del(`/bookings/1`);

    expect(res.status).toBe(401);
  });

  it("returns error for invalid token", async () => {
    const res = await del(`/bookings/999999`, "fake-token");

    expect(res.status).toBe(401);
  });
});
