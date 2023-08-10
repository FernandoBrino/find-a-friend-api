import { describe, beforeEach, it, expect } from "vitest";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { FetchPetsByCity } from "./fetch-pets-by-city";

let orgsRepository: InMemoryOrgsRepository;
let petsRepository: InMemoryPetsRepository;
let sut: FetchPetsByCity;

describe("Fetch Pets By City Service", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository();
    sut = new FetchPetsByCity(petsRepository, orgsRepository);
  });

  it("should be able to fetch pets by city", async () => {
    const orgSp = await orgsRepository.create({
      name: "Dogs Donation ORG",
      email: "dogs@example.com",
      phone: "130987651123",
      city: "São Paulo",
    });

    const orgRj = await orgsRepository.create({
      name: "Dogs Donation ORG",
      email: "dogs@example.com",
      phone: "130987651123",
      city: "Rio de Janeiro",
    });

    await petsRepository.create({
      name: "Rex",
      description: "Funny",
      age: "PUPPY",
      size: "LITTLE",
      org_id: orgSp.id,
    });

    await petsRepository.create({
      name: "Fluffy",
      description: "Anger",
      age: "ADULT",
      size: "LITTLE",
      org_id: orgRj.id,
    });

    const { pets } = await sut.execute({ city: "São Paulo" });

    expect(pets).toEqual([
      expect.objectContaining({
        name: "Rex",
        description: "Funny",
        age: "PUPPY",
        size: "LITTLE",
      }),
    ]);
  });
});
