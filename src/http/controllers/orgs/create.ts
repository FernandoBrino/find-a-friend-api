import { OrgAlreadyExistsError } from "@/services/errors/org-already-exists.error";
import { makeCreateOrgService } from "@/services/factories/make-create-org-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    password: z.string().min(6),
    email: z.string().email(),
    phone: z.string(),
    city: z.string(),
  });

  const { name, password, email, phone, city } = createBodySchema.parse(
    request.body
  );

  try {
    const createOrgService = makeCreateOrgService();
    await createOrgService.execute({
      name,
      password,
      email,
      phone,
      city,
    });

    return reply.status(201).send();
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      });
    }

    throw error;
  }
}
