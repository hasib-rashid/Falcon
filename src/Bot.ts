import { config } from "dotenv";
config();

import Falcon from "./base/Client";

new Falcon().start();