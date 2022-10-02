import type { PrismaClient } from "@prisma/client";

import type { CartModule } from "./__generated__/module-types";

const CartMutation: CartModule.Resolvers["Mutation"] = {
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
};

export async function findOrCreateCart(prisma: PrismaClient, id: string) {
  let cart;
  if (id) {
    cart = await prisma.cart.findUnique({
      where: { id },
    });
  }

  if (!cart) {
    cart = await prisma.cart.create({ data: {} });
  }

  return cart;
}

export default CartMutation;
