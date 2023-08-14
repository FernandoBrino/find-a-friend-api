import { describe, beforeEach, it, expect } from "vitest";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { SearchPetsService } from "./search-pets";

let petsRepository: InMemoryPetsRepository;
let sut: SearchPetsService;

describe("Searchs Pets Service", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new SearchPetsService(petsRepository);
  });

  it("should be able to search for a pet", async () => {
    await petsRepository.create({
      name: "Fluffy",
      description: "Anger",
      age: "ADULT",
      size: "LITTLE",
      org_id: "Org 1",
    });

    const { pets } = await sut.execute({ query: "ADULT" });

    expect(pets).toEqual([
      expect.objectContaining({
        name: "Fluffy",
        description: "Anger",
        age: "ADULT",
        size: "LITTLE",
      }),
    ]);
  });
});
