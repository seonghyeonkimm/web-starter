import React from "react";
import {
  loadQuery,
  OperationDescriptor,
  PreloadedQuery,
  RelayEnvironmentProvider,
  useLazyLoadQuery,
} from "react-relay";
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils";
import { render } from "@testing-library/react";
import { GraphQLTaggedNode, OperationType } from "relay-runtime";
import { RelayMockEnvironment } from "relay-test-utils/lib/RelayModernMockEnvironment";

type OperationProps =
  | {
      resolveOperations?: undefined;
      rejectOperations?: ((operation: OperationDescriptor) => Error) | Error;
    }
  | {
      resolveOperations?: MockPayloadGenerator.MockResolvers;
      rejectOperations?: undefined;
    };

type RelayAppRenderProps = {
  ui: React.ReactElement;
  fallback?: React.ReactElement;
  environment?: RelayMockEnvironment;
} & OperationProps;

export function renderRelayApp({
  ui,
  fallback,
  resolveOperations,
  rejectOperations,
  environment = createMockEnvironment(),
}: RelayAppRenderProps) {
  const renderResult = render(
    <RelayEnvironmentProvider environment={environment}>
      <React.Suspense fallback={fallback ?? null}>{ui}</React.Suspense>
    </RelayEnvironmentProvider>
  );

  if (rejectOperations) {
    environment.mock.rejectMostRecentOperation(rejectOperations);
  } else {
    environment.mock.resolveMostRecentOperation((operation) => {
      return MockPayloadGenerator.generate(operation, resolveOperations);
    });
  }

  return {
    environment,
    renderResult,
  };
}

type RenderUI<T extends OperationType> = (
  query: T["response"]
) => React.ReactElement;

export function renderRelayFragmentApp<T extends OperationType>({
  ui,
  query,
  variables,
  ...renderProps
}: Omit<RelayAppRenderProps, "ui"> & {
  ui: RenderUI<T>;
  query: GraphQLTaggedNode;
  variables?: T["variables"];
}) {
  function Renderer() {
    const lazyLoadQuery = useLazyLoadQuery<T>(query, variables);
    return React.cloneElement(ui(lazyLoadQuery));
  }

  return renderRelayApp({
    ui: <Renderer />,
    ...renderProps,
  } as RelayAppRenderProps);
}

type RenderPreloadUI<T extends OperationType> = (
  preloadedQuery: PreloadedQuery<T>
) => React.ReactElement;

export function renderRelayPreloadApp<T extends OperationType>({
  ui,
  query,
  variables,
  fallback,
  ...renderProps
}: Omit<RelayAppRenderProps, "ui"> & {
  ui: RenderPreloadUI<T>;
  query: GraphQLTaggedNode;
  variables?: T["variables"];
}) {
  const environment = createMockEnvironment();
  environment.mock.queueOperationResolver((operation) =>
    MockPayloadGenerator.generate(operation, renderProps.resolveOperations)
  );
  environment.mock.queuePendingOperation(query, variables);
  const preloadedQuery = loadQuery<T>(environment, query, variables);

  const renderResult = render(
    <RelayEnvironmentProvider environment={environment}>
      <React.Suspense fallback={fallback ?? null}>
        {ui(preloadedQuery)}
      </React.Suspense>
    </RelayEnvironmentProvider>
  );

  return {
    environment,
    renderResult,
  };
}
