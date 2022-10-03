import type { CartModule } from "./__generated__/module-types";

const CartResolver: CartModule.Resolvers["Cart"] = {
  items: async ({ id }, _, { cartService }) => {
    return cartService.getCartItems(id);
  },
  totalItems: async ({ id }, _, { cartService }) => {
    return cartService.getTotalItems(id);
  },
};

export default CartResolver;
