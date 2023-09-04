import { createRoot } from "react-dom/client";
import { CommonScss } from "@allaround/all-components";
import { RouterProvider, createHashRouter } from "react-router-dom";

import YoutubeTLDR from "./YoutubeTLDR";

CommonScss.reset().common();

const root = createRoot(document.getElementById("root")!);

const router = createHashRouter([
  {
    path: "/",
    element: <YoutubeTLDR />,
  },
]);

root.render(<RouterProvider router={router} />);
