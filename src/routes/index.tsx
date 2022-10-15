import { graphql, useMutation, usePreloadedQuery } from "react-relay/hooks";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import type { RelayProps } from "relay-nextjs";

import { routesQuery } from "src/relay/__generated__/routesQuery.graphql";
import { routesAddCartMutation } from "src/relay/__generated__/routesAddCartMutation.graphql";
import { routesRemoveCartMutation } from "src/relay/__generated__/routesRemoveCartMutation.graphql";

export const RoutesQuery = graphql`
  query routesQuery {
    cart(id: "634a7e4467d45160072cdc7d") {
      id
      totalItems
      items {
        id
        name
        quantity
      }
    }
  }
`;

function MainPage({
  preloadedQuery,
}: RelayProps<Record<string, unknown>, routesQuery>) {
  const { theme, setTheme } = useTheme();
  const query = usePreloadedQuery(RoutesQuery, preloadedQuery);
  const session = useSession();

  const [addMutation] = useMutation<routesAddCartMutation>(graphql`
    mutation routesAddCartMutation {
      addCartItem(
        input: {
          cartId: "634a7e4467d45160072cdc7d"
          name: "NewCartItem"
          price: 10000
        }
      ) {
        id
        totalItems
        items {
          id
          name
          quantity
        }
      }
    }
  `);

  const [removeMutation] = useMutation<routesRemoveCartMutation>(graphql`
    mutation routesRemoveCartMutation($itemId: ID!) {
      removeCartItem(input: { id: $itemId }) {
        id
        totalItems
        items {
          id
          name
          quantity
        }
      }
    }
  `);

  return (
    <div>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Change Theme
      </button>
      <button
        onClick={() =>
          addMutation({
            variables: {},
          })
        }
      >
        Add CartItem
      </button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const $deleteCartItemInput = e.currentTarget
            .elements[0] as HTMLInputElement;
          if ($deleteCartItemInput.value) {
            removeMutation({
              variables: { itemId: $deleteCartItemInput.value },
            });
            $deleteCartItemInput.value = "";
          }
        }}
      >
        <input type="text" id="deleteCartItemId" />
        <button type="submit">Delete CartItem</button>
      </form>
      <pre>{JSON.stringify(query.cart, null, 2)}</pre>
      <hr />
      <div>
        <button onClick={() => signIn("google")}>SignIn</button>
        <button onClick={() => signOut()}>SignOut</button>
        <div>
          userInfo: <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
