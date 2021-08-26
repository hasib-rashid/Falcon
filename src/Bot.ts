import { config } from "dotenv";
config();

import CodeFictionist from "./Base/Client";

new CodeFictionist()
	.start();