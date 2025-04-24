import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";
import "./styles/globals.css";

hydrateRoot(document, <HydratedRouter />);
