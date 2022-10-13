import type { YogaNodeServerInstance } from "@graphql-yoga/node";
import type { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

declare global {
  var graphqlServer: YogaNodeServerInstance<{}, {}, {}>;
  var prisma: PrismaClient | undefined;
}
