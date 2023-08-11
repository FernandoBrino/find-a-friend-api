import { Org } from "@prisma/client";
import { OrgsRepository } from "@/repositories/orgs-repository";
import { OrgAlreadyExistsError } from "./errors/org-already-exists.error";

interface CreateOrgServiceRequest {
  name: string;
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
    email,
    phone,
    city,
  }: CreateOrgServiceRequest): Promise<CreateOrgServiceResponse> {
    const orgWithSameEmail = await this.orgsRepository.findByEmail(email);

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError();
    }

    const org = await this.orgsRepository.create({
      name,
      email,
      phone,
      city,
    });

    return {
      org,
    };
  }
}
