import prisma from "src/lib/prisma";

import { CartMutation, CartQuery, CartResolver, CartService } from "./cart";
import type { Resolvers } from "../__generated__/graphql";

export type GrahpQLContext = { cartService: CartService };

export function context(): GrahpQLContext {
  return {
    cartService: new CartService(prisma),
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
