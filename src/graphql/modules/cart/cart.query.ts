import type { CartModule } from "./__generated__/module-types";

const CartQuery: CartModule.Resolvers["Query"] = {
  cart: async (_, { id }, { cartService }) => {
    return cartService.findOrCreateCart(id);
  },
};

export default CartQuery;
