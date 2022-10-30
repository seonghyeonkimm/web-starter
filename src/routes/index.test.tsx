import React from "react";
import { useSession } from "next-auth/react";
import { screen } from "@testing-library/react";

import type { routesQuery } from "src/relay/__generated__/routesQuery.graphql";
import type { TestQuery } from "src/relay/__generated__/TestQuery.graphql";
import {
  renderRelayApp,
  renderRelayFragmentApp,
  renderRelayPreloadApp,
} from "src/tests/utils";

import MainPage, { RoutesQuery } from "./index";
import Test, { Child, TESTS_QUERY } from "./Test";

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
