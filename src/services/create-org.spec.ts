import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { describe, beforeEach, it, expect } from "vitest";
import { CreateOrgService } from "./create-org";

let orgsRepository: InMemoryOrgsRepository;
let sut: CreateOrgService;

describe("Create Org Service", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new CreateOrgService(orgsRepository);
  });

  it("should be able to create", async () => {
    const { org } = await sut.execute({
      name: "Dogs Donation ORG",
      email: "dogs@example.com",
      phone: "130987651123",
      city: "São Paulo",
    });

    expect(org.id).toEqual(expect.any(String));
  });
});
