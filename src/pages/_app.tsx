import { Suspense } from "react";
import { RelayEnvironmentProvider } from "react-relay";
import { useEnvironment } from "src/graphql/lib/relay";

export default function App({ Component, pageProps }) {
  const environment = useEnvironment(pageProps.initialRecords);

  return (
    <RelayEnvironmentProvider environment={environment}>
      <Suspense fallback={null}>
        <Component {...pageProps} />
      </Suspense>
    </RelayEnvironmentProvider>
  );
}
