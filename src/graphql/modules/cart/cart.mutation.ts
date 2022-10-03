import type { CartModule } from "./__generated__/module-types";

const CartMutation: CartModule.Resolvers["Mutation"] = {
  removeCartItem: async (_, { input }, { cartService }) => {
    const { cartId } = await cartService.deleteCartItem(input.id);
    return cartService.findOrCreateCart(cartId);
  },
  addCartItem: async (_, { input }, { cartService }) => {
    const cart = await cartService.findOrCreateCart(input.cartId);
    await cartService.addOrIncreaseCartItem(cart.id, input);
    return cart;
  },
};

export default CartMutation;
