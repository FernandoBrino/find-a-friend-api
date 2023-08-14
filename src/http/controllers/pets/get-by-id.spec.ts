import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Get Pet By Id e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get by id", async () => {
    const org = await prisma.org.create({
      data: {
        name: "Org example",
        password_hash: "123456",
        email: "org@example.com",
        city: "São Paulo",
        phone: "1300001111",
      },
    });

    const pet = await prisma.pet.create({
      data: {
        org_id: org.id,
        name: "Rex",
        description: "Funny",
        age: "PUPPY",
        size: "BIG",
      },
    });

    const response = await request(app.server).get(`/pets/${pet.id}`).send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        name: "Rex",
        description: "Funny",
        age: "PUPPY",
        size: "BIG",
      })
    );
  });
});
