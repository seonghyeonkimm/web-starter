import { createServer } from "@graphql-yoga/node";
import { makeExecutableSchema } from '@graphql-tools/schema';

import typeDefs from 'src/graphql/__generated__/typeDefs';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: {
      hello: () => "Hello from Yoga!",
    },
  },
});

const server = createServer({
  schema,
});

export default server;
