import { describe, beforeEach, it, expect } from "vitest";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { GetPetById } from "./get-pet-by-id";

let petsRepository: InMemoryPetsRepository;
let sut: GetPetById;

describe("Get Pet By Id Service", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new GetPetById(petsRepository);
  });

  it("should be able to get a pet", async () => {
    const createdPet = await petsRepository.create({
      name: "Fluffy",
      description: "Anger",
      age: "ADULT",
      size: "LITTLE",
      org_id: "Org 1",
    });

    const { pet } = await sut.execute({ id: createdPet.id });

    expect(pet).toEqual(
      expect.objectContaining({
        name: "Fluffy",
        description: "Anger",
        age: "ADULT",
        size: "LITTLE",
      })
    );
  });
});
