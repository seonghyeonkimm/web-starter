import type { PrismaClient } from "@prisma/client";

import prisma from "src/lib/prisma";

import { CartMutation, CartQuery, CartResolver } from "./cart";
import type { Resolvers } from "../__generated__/graphql";

export type GrahpQLContext = { prisma: PrismaClient };

export function context(): GrahpQLContext {
  return {
    prisma,
  };
}

export const resolvers: Resolvers = {
  Mutation: {
    ...CartMutation,
  },
  Query: {
    ...CartQuery,
  },
  Cart: CartResolver,
};
