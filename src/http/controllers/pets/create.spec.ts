import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create Pet e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create", async () => {
    const org = await prisma.org.create({
      data: {
        name: "Org example",
        password_hash: "123456",
        email: "org@example.com",
        city: "São Paulo",
        phone: "1300001111",
      },
    });

    const pet = await request(app.server).post("/pets").send({
      orgId: org.id,
      name: "Rex",
      description: "Funny",
      age: "PUPPY",
      size: "BIG",
    });

    expect(pet.statusCode).toEqual(201);
  });
});
