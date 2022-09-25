import { graphql, useLazyLoadQuery } from "react-relay";
import { pagesQuery } from "src/graphql/__generated__/pagesQuery.graphql";

const PAGES_QUERY = graphql`
  query pagesQuery {
    hello
  }
`


const Index = (props) => {
  const result = useLazyLoadQuery<pagesQuery>(PAGES_QUERY, {});

  return (
    <div>
      {result.hello}
    </div>
  );
};

export default Index;
