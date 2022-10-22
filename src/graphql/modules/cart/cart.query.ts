import type { CartModule } from "./__generated__/module-types";

const CartQuery: CartModule.Resolvers["Query"] = {
  cart: async (_, { id }, { cartService }) => {
    return cartService.findOrCreateCart(id);
  },
  cartItems: async (_, __, { cartService }) => {
    const items = await cartService.getCartItems();

    return {
      totalCount: items.length,
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
      },
      edges: items.map((node) => ({
        node,
        cursor: node.id,
      })),
    };
  },
};

export default CartQuery;
