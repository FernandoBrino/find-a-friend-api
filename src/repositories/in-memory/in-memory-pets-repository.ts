import { $Enums, Pet, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { PetsRepository } from "../pets-respository";

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];

  async fetchManyPetsByIds(ids: string[]) {
    const pets = this.items.filter((item) => {
      for (let id of ids) {
        return item.org_id === id;
      }
    });

    return pets;
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      org_id: data.org_id,
      name: data.name,
      description: data.description ?? null,
      age: data.age,
      size: data.size,
    };

    this.items.push(pet);

    return pet;
  }
}
