import * as React from "react";
import { RelayProps } from "relay-nextjs";
import { graphql, useMutation, usePreloadedQuery } from "react-relay/hooks";
import { pagesQuery } from "src/graphql/__generated__/pagesQuery.graphql";
import { withRelaySSRData } from "src/lib/relay";
import { pagesAddCartMutation } from "src/graphql/__generated__/pagesAddCartMutation.graphql";
import { pagesRemoveCartMutation } from "src/graphql/__generated__/pagesRemoveCartMutation.graphql";

const PagesQuery = graphql`
  query pagesQuery {
    cart(id: "6337d67ffce769bfe0392390") {
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

function MainPage({ preloadedQuery }: RelayProps<{}, pagesQuery>) {
  const query = usePreloadedQuery(PagesQuery, preloadedQuery);
  const [addMutation] = useMutation<pagesAddCartMutation>(graphql`
    mutation pagesAddCartMutation {
      addCartItem(
        input: {
          cartId: "6337d67ffce769bfe0392390"
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
    </div>
  );
}

export default withRelaySSRData(MainPage, PagesQuery);
