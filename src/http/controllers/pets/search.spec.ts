import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Search Pets e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to search", async () => {
    const org = await prisma.org.create({
      data: {
        name: "Org example",
        password_hash: "123456",
        email: "org@example.com",
        city: "São Paulo",
        phone: "1300001111",
      },
    });

    await prisma.pet.create({
      data: {
        org_id: org.id,
        name: "Rex",
        description: "Funny",
        age: "PUPPY",
        size: "BIG",
      },
    });

    const response = await request(app.server)
      .get("/pets/search")
      .query({
        q: "BIG",
      })
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.pets).toHaveLength(1);
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: "Rex",
        description: "Funny",
        age: "PUPPY",
        size: "BIG",
      }),
    ]);
  });
});
