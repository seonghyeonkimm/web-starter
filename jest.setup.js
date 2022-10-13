import "@testing-library/jest-dom/extend-expect";
import server from "./src/pages/api/graphql";

global.graphqlServer = server;
