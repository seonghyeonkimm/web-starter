import { screen } from "@testing-library/react";
import React from "react";
import Test, { Child, TESTS_QUERY } from "./Test";

import MainPage, { RoutesQuery } from "./index";
import { routesQuery } from "src/relay/__generated__/routesQuery.graphql";
import { useSession } from "next-auth/react";
import {
  renderRelayApp,
  renderRelayFragmentApp,
  renderRelayPreloadApp,
} from "src/tests/utils";
import { TestQuery } from "src/relay/__generated__/TestQuery.graphql";

jest.mock("next-auth/react");

const mockedUseSession = jest.mocked(useSession);

describe("MainPage", () => {
  it("render properly", async () => {
    renderRelayApp({
      ui: <Test />,
      fallback: <div>Loading...</div>,
    });
    // fallback test
    await screen.findAllByText("Loading...");

    // component rendering test
    await screen.findAllByText("Test");
  });

  it("render fragment app", async () => {
    renderRelayFragmentApp<TestQuery>({
      ui: (lazyLoadQuery) => <Child queryKey={lazyLoadQuery.cart} />,
      fallback: <div>Loading...</div>,
      query: TESTS_QUERY,
    });

    await screen.findAllByText("Loading...");
    await screen.findAllByText("Child");
  });

  it("render preloadQuery app", async () => {
    renderRelayPreloadApp<routesQuery>({
      query: RoutesQuery,
      ui: (preloadedQuery) => {
        return <MainPage CSN preloadedQuery={preloadedQuery} />;
      },
    });

    mockedUseSession.mockReturnValueOnce({
      data: null,
      status: "loading",
    });

    await screen.findByText("SignOut");
  });
});
