import type { CartModule } from "./__generated__/module-types";

const CartMutation: CartModule.Resolvers["Mutation"] = {
  removeCartItem: async (_, { input }, { cartService }) => {
    return await cartService.deleteCartItem(input.id);
  },
  addCartItem: async (_, { input }, { cartService }) => {
    const cart = await cartService.findOrCreateCart(input.cartId);
    const node = await cartService.addOrIncreaseCartItem(cart.id, input);
    return {
      node,
      cursor: node.id,
    };
  },
};

export default CartMutation;
