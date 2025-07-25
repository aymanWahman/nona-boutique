import { Prisma } from "@prisma/client";

export type ProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    sizes: true;
    colors: true;
  };
}>;
