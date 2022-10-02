import { Suspense } from "react";
import { RelayEnvironmentProvider } from "react-relay";
import { ThemeProvider } from "next-themes";
import { getInitialPreloadedQuery, getRelayProps } from "relay-nextjs/app";

import { getClientEnvironment } from "src/lib/relay";

import "normalize.css";
import "src/styles/theme.css";
import "src/styles/App.css";

const clientEnvironment = getClientEnvironment();
const initialPreloadedQuery = getInitialPreloadedQuery({
  createClientEnvironment: () => getClientEnvironment(),
});

export default function App({ Component, pageProps }) {
  const relayProps = getRelayProps(pageProps, initialPreloadedQuery);
  const environment =
    relayProps.preloadedQuery?.environment ?? clientEnvironment;

  return (
    <ThemeProvider>
      <RelayEnvironmentProvider environment={environment}>
        <Suspense fallback={null}>
          <Component {...pageProps} {...relayProps} />
        </Suspense>
      </RelayEnvironmentProvider>
    </ThemeProvider>
  );
}
