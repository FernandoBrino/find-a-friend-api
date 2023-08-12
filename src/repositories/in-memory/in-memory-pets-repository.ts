import { Pet, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { PetsRepository } from "../pets-respository";

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id);

    if (!pet) {
      return null;
    }

    return pet;
  }

  async fetchManyPetsByIds(ids: string[]) {
    const pets = this.items.filter((item) => {
      for (let id of ids) {
        return item.org_id === id;
      }
    });

    return pets;
  }

  async searchMany(query: string) {
    const pets = this.items.filter(
      (item) => item.age.includes(query) || item.size.includes(query)
    );

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
