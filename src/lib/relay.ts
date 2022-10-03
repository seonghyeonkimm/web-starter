import type { ComponentType } from "react";
import { getRelaySerializedState, withRelay } from "relay-nextjs";
import { withHydrateDatetime } from "relay-nextjs/date";
import type { WiredOptions, WiredProps } from "relay-nextjs/wired/component";
import type { GraphQLTaggedNode } from "relay-runtime";
import { Environment, Network, RecordSource, Store } from "relay-runtime";

export function createNetwork() {
  return Network.create(async (params, variables) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: params.text,
          variables,
        }),
      }
    );

    const json = await response.text();
    return JSON.parse(json, withHydrateDatetime);
  });
}

let clientEnv: Environment | undefined;
export function getClientEnvironment() {
  if (typeof window === "undefined") return null;

  if (clientEnv == null) {
    clientEnv = new Environment({
      network: createNetwork(),
      store: new Store(new RecordSource(getRelaySerializedState()?.records)),
      isServer: false,
    });
  }

  return clientEnv;
}

export function createServerEnvironment() {
  return new Environment({
    network: createNetwork(),
    store: new Store(new RecordSource()),
    isServer: true,
  });
}

export function withRelaySSRData<Props extends WiredProps, ServerSideProps>(
  PageComponent: ComponentType<Props>,
  GraphQLDocument: GraphQLTaggedNode,
  options?: WiredOptions<Props, ServerSideProps>
) {
  return withRelay(PageComponent, GraphQLDocument, {
    createClientEnvironment: () => getClientEnvironment(),
    createServerEnvironment: async () => {
      return createServerEnvironment();
    },
    ...options,
  });
}
