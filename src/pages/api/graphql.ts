import type { NextApiRequest, NextApiResponse } from "next";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { createServer } from "@graphql-yoga/node";

import { context, resolvers } from "src/graphql/modules";
import typeDefs from "src/graphql/typeDefs";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = createServer<{ req: NextApiRequest; res: NextApiResponse }>({
  schema,
  context,
});

export default server;
