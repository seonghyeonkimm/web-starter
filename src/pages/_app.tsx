import { Suspense } from "react";
import { RelayEnvironmentProvider } from "react-relay";
import { getInitialPreloadedQuery, getRelayProps } from "relay-nextjs/app";

import { getClientEnvironment } from "src/lib/relay";

import "src/styles/theme.css";

const clientEnvironment = getClientEnvironment();
const initialPreloadedQuery = getInitialPreloadedQuery({
  createClientEnvironment: () => getClientEnvironment(),
});

export default function App({ Component, pageProps }) {
  const relayProps = getRelayProps(pageProps, initialPreloadedQuery);
  const environment =
    relayProps.preloadedQuery?.environment ?? clientEnvironment;

  return (
    <RelayEnvironmentProvider environment={environment}>
      <Suspense fallback={null}>
        <Component {...pageProps} {...relayProps} />
      </Suspense>
    </RelayEnvironmentProvider>
  );
}
