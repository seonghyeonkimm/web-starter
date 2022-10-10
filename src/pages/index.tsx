import { graphql, useMutation, usePreloadedQuery } from "react-relay/hooks";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import type { RelayProps } from "relay-nextjs";

import { withRelaySSRData } from "src/lib/relay";
import type { pagesAddCartMutation } from "src/relay/__generated__/pagesAddCartMutation.graphql";
import type { pagesQuery } from "src/relay/__generated__/pagesQuery.graphql";
import type { pagesRemoveCartMutation } from "src/relay/__generated__/pagesRemoveCartMutation.graphql";

const PagesQuery = graphql`
  query pagesQuery {
    cart(id: "633969387d317c870e4c4b6b") {
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
}: RelayProps<Record<string, never>, pagesQuery>) {
  const { theme, setTheme } = useTheme();
  const query = usePreloadedQuery(PagesQuery, preloadedQuery);
  const session = useSession();

  const [addMutation] = useMutation<pagesAddCartMutation>(graphql`
    mutation pagesAddCartMutation {
      addCartItem(
        input: {
          cartId: "633969387d317c870e4c4b6b"
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

  const [removeMutation] = useMutation<pagesRemoveCartMutation>(graphql`
    mutation pagesRemoveCartMutation($itemId: ID!) {
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

export default withRelaySSRData(MainPage, PagesQuery);
