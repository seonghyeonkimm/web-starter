import { screen } from "@testing-library/react";
import React from "react";
import { graphql } from "react-relay";
import { TestQuery } from "src/relay/__generated__/TestQuery.graphql";
import Test, { Child } from "./Test";

import MainPage, { RoutesQuery } from "./index";
import { routesQuery } from "src/relay/__generated__/routesQuery.graphql";
import { useSession } from "next-auth/react";
import {
  renderRelayApp,
  renderRelayFragmentApp,
  renderRelayPreloadApp,
} from "src/tests/utils";

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
      query: graphql`
        query routes2Query @relay_test_operation {
          cart(id: "633969387d317c870e4c4b6b") {
            ...TestFragment
            items {
              edges {
                node {
                  id
                  name
                  quantity
                }
              }
            }
          }
        }
      `,
    });

    await screen.findAllByText("Loading...");
    await screen.findAllByText("Child");
  });

  // TODO: fallback이 아닌 render된 결과에 대한 테스트를 하도록 변경 (현재 rendering이 안되고 있음..)
  it("render preloadQuery app", async () => {
    renderRelayPreloadApp<routesQuery>({
      ui: (preloadedQuery) => <MainPage CSN preloadedQuery={preloadedQuery} />,
      fallback: <Fallback />,
      query: RoutesQuery,
    });

    mockedUseSession.mockReturnValueOnce({
      data: null,
      status: "loading",
    });

    await screen.findByText("Loading");
  });
});

function Fallback() {
  return <div>Loading</div>;
}
