import { describe, beforeEach, it, expect } from "vitest";
import { CreatePetService } from "./create-pet";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";

let orgsRepository: InMemoryOrgsRepository;
let petsRepository: InMemoryPetsRepository;
let sut: CreatePetService;

describe("Create Pet Service", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository();
    sut = new CreatePetService(petsRepository, orgsRepository);
  });

  it("should be able to create", async () => {
    const org = await orgsRepository.create({
      name: "Dogs Donation ORG",
      email: "dogs@example.com",
      phone: "130987651123",
      city: "São Paulo",
    });

    const { pet } = await sut.execute({
      name: "Rex",
      description: "Funny",
      age: "PUPPY",
      size: "LITTLE",
      orgId: org.id,
    });

    expect(pet.id).toEqual(expect.any(String));
  });
});
