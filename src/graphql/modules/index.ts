import type { PrismaClient } from "@prisma/client";

import prisma from "src/lib/prisma";

import type { Resolvers } from "../resolvers-types";

export type GrahpQLContext = { prisma: PrismaClient };

export function context(): GrahpQLContext {
  return {
    prisma,
  };
}

export const resolvers: Resolvers = {
  Mutation: {
    removeCartItem: async (_, { input }, { prisma }) => {
      const { cartId } = await prisma.cartItem.delete({
        where: { id: input.id },
      });
      return findOrCreateCart(prisma, cartId);
    },
    addCartItem: async (_, { input }, { prisma }) => {
      const cart = await findOrCreateCart(prisma, input.cartId);

      if (input.id) {
        await prisma.cartItem.upsert({
          create: {
            cartId: cart.id,
            name: input.name,
            description: input.description,
            image: input.image,
            price: input.price,
            quantity: input.quantity || 1,
            id: input.id,
          },
          where: { id: input.id },
          update: {
            quantity: {
              increment: input.quantity || 1,
            },
          },
        });
      } else {
        await prisma.cartItem.create({
          data: {
            cartId: cart.id,
            name: input.name,
            description: input.description,
            image: input.image,
            price: input.price,
            quantity: input.quantity || 1,
          },
        });
      }

      return cart;
    },
  },
  Query: {
    cart: async (_, { id }, { prisma }) => {
      return await findOrCreateCart(prisma, id);
    },
  },
  Cart: {
    items: async ({ id }, _, { prisma }) => {
      const items = await prisma.cart
        .findUnique({
          where: { id },
        })
        .items();

      return items;
    },
    totalItems: async ({ id }, _, { prisma }) => {
      const items = await prisma.cart
        .findUnique({
          where: { id },
        })
        .items();

      return items.reduce((total, item) => total + item.quantity || 1, 0);
    },
  },
};

export async function findOrCreateCart(prisma: PrismaClient, id: string) {
  let cart;
  if (id) {
    cart = await prisma.cart.findUnique({
      where: { id },
    });
  }
  console.log({ cart });

  if (!cart) {
    cart = await prisma.cart.create({ data: {} });
  }

  return cart;
}
