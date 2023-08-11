import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { describe, beforeEach, it, expect } from "vitest";
import { AuthenticateService } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials.error";

let orgsRepository: InMemoryOrgsRepository;
let sut: AuthenticateService;

describe("Authenticate Service", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new AuthenticateService(orgsRepository);
  });

  it("should be able to login", async () => {
    orgsRepository.create({
      name: "Dogs Donation ORG",
      password_hash: await hash("12345678", 6),
      email: "dogs@example.com",
      phone: "130987651123",
      city: "São Paulo",
    });

    const { org } = await sut.execute({
      email: "dogs@example.com",
      password: "12345678",
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it("should not be able to login with wrong e-mail", async () => {
    expect(() =>
      sut.execute({
        email: "dogs@example.com",
        password: "12345678",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to login with wrong e-mail", async () => {
    orgsRepository.create({
      name: "Dogs Donation ORG",
      password_hash: await hash("12345678", 6),
      email: "dogs@example.com",
      phone: "130987651123",
      city: "São Paulo",
    });

    expect(() =>
      sut.execute({
        email: "dogs@example.com",
        password: "12345679",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
