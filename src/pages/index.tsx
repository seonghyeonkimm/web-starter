import { withRelaySSRData } from "src/lib/relay";
import MainPage, { RoutesQuery } from "src/routes";

export default withRelaySSRData(MainPage, RoutesQuery);
