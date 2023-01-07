import React from "react";
import { createRoot } from "react-dom/client";

import Main from "./Main";

const el = document.getElementById("root");
const root = createRoot(el);
root.render(<Main />);
