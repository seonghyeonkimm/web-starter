import * as React from "react";
import { graphql, useFragment, useLazyLoadQuery } from "react-relay";
import { TestQuery } from "src/relay/__generated__/TestQuery.graphql";

type Props = {};

const TESTS_QUERY = graphql`
  query TestQuery {
    cart(id: "633969387d317c870e4c4b6b") {
      ...TestFragment
      items {
        id
        name
        quantity
      }
    }
  }
`;

function Test(props: Props) {
  const query = useLazyLoadQuery<TestQuery>(TESTS_QUERY, {});

  return (
    <div>
      Test
      <Child queryKey={query.cart} />
    </div>
  );
}

const CHILD_FRAGMENT = graphql`
  fragment TestFragment on Cart {
    id
    totalItems
  }
`;

export function Child({ queryKey }: { queryKey: any }) {
  const data = useFragment(CHILD_FRAGMENT, queryKey);
  return <div>Child</div>;
}

export default Test;
