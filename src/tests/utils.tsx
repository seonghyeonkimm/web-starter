import React from "react";
import { RelayEnvironmentProvider } from "react-relay";
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils";
import { render } from "@testing-library/react";

export function renderRelayApp(ui: React.ReactElement) {
  const environment = createMockEnvironment();
  environment.mock.queueOperationResolver((operation) => {
    console.log("🚀 ~ file: utils.tsx ~ line 9 ~ operation", operation);
    return MockPayloadGenerator.generate(operation);
  });

  render(
    <RelayEnvironmentProvider environment={environment}>
      <React.Suspense fallback={null}>{ui}</React.Suspense>
    </RelayEnvironmentProvider>
  );
}
