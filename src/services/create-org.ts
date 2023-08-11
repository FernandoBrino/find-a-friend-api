import { Org } from "@prisma/client";
import { OrgsRepository } from "@/repositories/orgs-repository";
import { OrgAlreadyExistsError } from "./errors/org-already-exists.error";
import { hash } from "bcryptjs";

interface CreateOrgServiceRequest {
  name: string;
  password: string;
  email: string;
  phone: string;
  city: string;
}

interface CreateOrgServiceResponse {
  org: Org;
}

export class CreateOrgService {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    password,
    email,
    phone,
    city,
  }: CreateOrgServiceRequest): Promise<CreateOrgServiceResponse> {
    const password_hash = await hash(password, 6);

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email);

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError();
    }

    const org = await this.orgsRepository.create({
      name,
      password_hash,
      email,
      phone,
      city,
    });

    return {
      org,
    };
  }
}
