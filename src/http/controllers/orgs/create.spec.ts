import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create Org e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create", async () => {
    const org = await request(app.server).post("/orgs").send({
      name: "Org Example",
      password: "123456",
      email: "org@example.com",
      phone: "1300081111",
      city: "São Paulo",
    });

    expect(org.statusCode).toEqual(201);
  });
});
