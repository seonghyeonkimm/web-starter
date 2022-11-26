import { createSchema,createYoga, useErrorHandler } from 'graphql-yoga'

import typeDefs from "src/graphql/__generated__/typeDefs";
import { context, resolvers } from "src/graphql/modules";

const schema = createSchema({
  typeDefs,
  resolvers,
});

export default createYoga({
  graphqlEndpoint: '/api/graphql',
  schema,
  context, 
  plugins:
    process.env.NODE_ENV === "development"
      ? [
          // eslint-disable-next-line react-hooks/rules-of-hooks
          useErrorHandler(({ errors }) =>
            errors.map((e) => {
              // eslint-disable-next-line no-console
              console.log("❌ error: ", e.message);
            })
          ),
        ]
      : [],
})

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false
  }
}
