import type { CartModule } from "./__generated__/module-types";

const CartResolver: CartModule.Resolvers["Cart"] = {
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
};

export default CartResolver;
