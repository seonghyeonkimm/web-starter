import { createServer } from "@graphql-yoga/node";
import { makeExecutableSchema } from '@graphql-tools/schema';

import typeDefs from 'src/graphql/typeDefs';
import resolvers from 'src/graphql/modules';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = createServer({
  schema,
});

export default server;
