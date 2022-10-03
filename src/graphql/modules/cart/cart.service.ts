import type { CartItem, PrismaClient } from "@prisma/client";

import type { AddToCartInput } from "src/graphql/__generated__/graphql";

class CartService {
  constructor(private readonly prisma: PrismaClient) {}

  async findOrCreateCart(id: string) {
    const { prisma } = this;

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

  async getCartItems(id: string) {
    const { prisma } = this;
    const items = await prisma.cart
      .findUnique({
        where: { id },
      })
      .items();

    return items;
  }

  async getTotalItems(id: string) {
    const items = await this.getCartItems(id);
    return items.reduce((total, item) => total + item.quantity || 1, 0);
  }

  async deleteCartItem(itemId: string) {
    const { prisma } = this;

    return await prisma.cartItem.delete({
      where: { id: itemId },
    });
  }

  async addOrIncreaseCartItem(cartId: string, input: AddToCartInput) {
    const { prisma } = this;

    let cartItem: CartItem;
    if (input.id) {
      cartItem = await prisma.cartItem.upsert({
        create: {
          cartId,
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
      cartItem = await prisma.cartItem.create({
        data: {
          cartId,
          name: input.name,
          description: input.description,
          image: input.image,
          price: input.price,
          quantity: input.quantity || 1,
        },
      });
    }

    return cartItem;
  }
}

export default CartService;
