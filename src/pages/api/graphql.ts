import type { NextApiRequest, NextApiResponse } from "next";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { createServer, useErrorHandler } from "@graphql-yoga/node";

import typeDefs from "src/graphql/__generated__/typeDefs";
import { context, resolvers } from "src/graphql/modules";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = createServer<{ req: NextApiRequest; res: NextApiResponse }>({
  schema,
  context,
  plugins:
    process.env.NODE_ENV === "development"
      ? [
          // eslint-disable-next-line react-hooks/rules-of-hooks
          useErrorHandler((errorHandler) =>
            errorHandler.map((e) => {
              // eslint-disable-next-line no-console
              console.log("❌ error: ", e.message);
            })
          ),
        ]
      : [],
});

export default server;
