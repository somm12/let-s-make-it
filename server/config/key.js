import production from "./production.js";
import dev from "./dev.js";

let moduleToExport;

if (process.env.NODE_ENV === "production") {
  //  배포상태
  moduleToExport = production;
} else {
  // 개발상태
  moduleToExport = dev;
}

export default moduleToExport;
