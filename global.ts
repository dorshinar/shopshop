import { Connection } from "@planetscale/database";

declare global {
  var __db__: Connection;
}
