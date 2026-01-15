import { describe, it, expect } from "vitest";
import { post } from "../helpers.js";

describe("POST /bookings", () => {
  it("requires authentication token", async () => {
    const res = await post("/bookings", {
      carName: "BMW",
      days: 3,
      rentPerDay: 1000,
    });

    expect(res.status).toBe(401);
  });
});
