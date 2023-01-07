import React from "react";
import { createRoot } from "react-dom/client";
import ReactDom from "react-dom";

import Main from "./Main";

const el = document.getElementById("site2");
if (el) {
  const root = createRoot(el);
  root.render(<Main />);
}

window.renderSite2 = (container) => {
  ReactDom.render(<Main />, document.getElementById(container));
};
