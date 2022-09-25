import { Suspense } from "react";
import { RelayEnvironmentProvider } from "react-relay";
import { useEnvironment } from "src/graphql/RelayEnvironment";

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
