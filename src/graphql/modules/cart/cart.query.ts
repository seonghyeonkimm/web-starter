import type { CartModule } from "./__generated__/module-types";

const CartQuery: CartModule.Resolvers["Query"] = {
  cart: async (_, { id }, { prisma }) => {
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
  },
};

export default CartQuery;
