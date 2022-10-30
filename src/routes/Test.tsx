import * as React from "react";
import { graphql, useFragment, useLazyLoadQuery } from "react-relay/hooks";

import type { TestQuery } from "src/relay/__generated__/TestQuery.graphql";

export const TESTS_QUERY = graphql`
  query TestQuery {
    cart(id: "633969387d317c870e4c4b6b") {
      ...TestFragment
    }
  }
`;

function Test() {
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
  }
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Child({ queryKey }: { queryKey: any }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const data = useFragment(CHILD_FRAGMENT, queryKey);
  return <div>Child</div>;
}

export default Test;
