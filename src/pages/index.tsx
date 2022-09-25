import { RelayProps } from "relay-nextjs";
import { graphql, usePreloadedQuery } from "react-relay/hooks";
import { pagesQuery } from "src/graphql/__generated__/pagesQuery.graphql";
import { withRelaySSRData } from "src/lib/relay";

const PagesQuery = graphql`
  query pagesQuery {
    hello
  }
`;

function MainPage({ preloadedQuery }: RelayProps<{}, pagesQuery>) {
  const query = usePreloadedQuery(PagesQuery, preloadedQuery);

  return (
    <div>
      Hello {query.hello}
    </div>
  );
}

export default withRelaySSRData(MainPage, PagesQuery);