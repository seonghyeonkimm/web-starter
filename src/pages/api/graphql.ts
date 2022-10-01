import { createServer } from "@graphql-yoga/node";
import { makeExecutableSchema } from "@graphql-tools/schema";

import typeDefs from "src/graphql/typeDefs";
import { resolvers, context } from "src/graphql/modules";
import { NextApiRequest, NextApiResponse } from "next";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = createServer<{ req: NextApiRequest; res: NextApiResponse }>({
  schema,
  context,
});

export default server;
